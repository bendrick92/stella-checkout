// Listens on the mic for the toy scanner's beep: a steady tone at ~1960 Hz, ~0.3 s (measured from a recording).
// shortcut: tuned to one toy and one room; if it misses or false-fires, change TONE_DB or RANGE.
const RANGE = [1850, 2100] // Hz where the beep lives
const AROUND = [[500, 1500], [2600, 4000]] // Hz compared against: a beep stands out, speech and noise don't
const TONE_DB = 25 // how far the tone must rise above the surrounding spectrum (quiet-room noise reaches ~18, the beep 31+)
const MIN_DB = -55 // and be this loud, so a silent room's random peaks never count (the beep measures ~-32)
const FRAMES = 3 // consecutive loud frames (~50 ms) before it counts
const COOLDOWN = 800 // ms; one beep must not add two books

// db: AnalyserNode.getFloatFrequencyData output. Returns tone dB minus average surrounding dB.
export function beepScore(db, binHz) {
  const bin = (hz) => Math.round(hz / binHz)
  let tone = -Infinity
  for (let i = bin(RANGE[0]); i <= bin(RANGE[1]); i++) tone = Math.max(tone, db[i])
  let sum = 0, n = 0
  for (const [a, b] of AROUND) for (let i = bin(a); i <= bin(b); i++) { sum += db[i]; n++ }
  return tone < MIN_DB ? 0 : tone - sum / n
}

// Resolves to a stop function. Rejects if the mic is denied or unavailable.
export async function startScanner(onBeep) {
  // voice processing would filter out a short steady tone, so turn it all off
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
  })
  const ctx = new AudioContext()
  await ctx.resume()
  const an = ctx.createAnalyser()
  an.fftSize = 4096
  an.smoothingTimeConstant = 0
  ctx.createMediaStreamSource(stream).connect(an) // not connected to the speakers
  const db = new Float32Array(an.frequencyBinCount)
  const binHz = ctx.sampleRate / an.fftSize

  let raf, hits = 0, last = 0
  const tick = () => {
    an.getFloatFrequencyData(db)
    hits = beepScore(db, binHz) > TONE_DB ? hits + 1 : 0
    const now = performance.now()
    if (hits >= FRAMES && now - last > COOLDOWN) { last = now; onBeep() }
    raf = requestAnimationFrame(tick)
  }
  tick()

  return () => {
    cancelAnimationFrame(raf)
    stream.getTracks().forEach((t) => t.stop())
    ctx.close()
  }
}
