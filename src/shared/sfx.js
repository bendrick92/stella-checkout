// Synthesized with Web Audio so there are no asset files to ship.
let ctx

// One oscillator blip: frequency f0 sliding to f1 over d seconds, starting t seconds from now.
const blip = (type, f0, f1, d, t = 0, vol = 0.2) => {
  const s = ctx.currentTime + t
  const o = ctx.createOscillator()
  const g = ctx.createGain()
  o.type = type
  o.frequency.setValueAtTime(f0, s)
  o.frequency.exponentialRampToValueAtTime(f1, s + d)
  g.gain.setValueAtTime(vol, s)
  g.gain.exponentialRampToValueAtTime(0.001, s + d)
  o.connect(g).connect(ctx.destination)
  o.start(s)
  o.stop(s + d)
}

const PENTATONIC = [523, 587, 659, 784, 880] // C major pentatonic: any random pick sounds pleasant

const SOUNDS = {
  // Animal Crossing-style: soft sine blips, each tap a random note that scoops up into pitch
  item: () => { const f = PENTATONIC[Math.floor(Math.random() * PENTATONIC.length)]; blip('sine', f * 0.7, f, 0.1, 0, 0.5) },
  button: () => { blip('sine', 392, 440, 0.06, 0, 0.35); blip('sine', 523, 587, 0.09, 0.06, 0.5) }, // gentle two-note bloop
  checkout: () => { // cheerful rising arpeggio ending on a long bell ring
    ;[523, 659, 784].forEach((f, i) => blip('sine', f * 0.8, f, 0.12, i * 0.08, 0.5))
    blip('triangle', 1047, 1047, 0.9, 0.24, 0.4)
    blip('sine', 2093, 2093, 0.6, 0.24, 0.3)
  },
}

export const play = (name) => {
  try {
    ctx ??= new AudioContext()
    ctx.resume()
    SOUNDS[name]()
  } catch { /* no audio available: stay silent */ }
}
