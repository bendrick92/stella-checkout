import { useRef, useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import Scroller from '../../shared/Scroller'

function Stepper({ label, value, text, onChange }) {
  return (
    <div className="stepper">
      <span className="lbl">{label}</span>
      <button onClick={() => onChange(value - 1)}><Minus size={30} /></button>
      <span className="val">{text}</span>
      <button onClick={() => onChange(value + 1)}><Plus size={30} /></button>
    </div>
  )
}

function Pair({ value, onChange }) {
  return (
    <div className="pair">
      {['Normal', 'Needs follow-up'].map((o) => (
        <button key={o} className={value === o ? 'on' : ''} onClick={() => onChange(o)}>{o}</button>
      ))}
    </div>
  )
}

// Finger-drawn signature; reports whether anything has been drawn.
function Signature({ onSigned }) {
  const ref = useRef(null)
  const last = useRef(null)
  const at = (e) => {
    const c = ref.current
    const r = c.getBoundingClientRect()
    return [((e.clientX - r.left) * c.width) / r.width, ((e.clientY - r.top) * c.height) / r.height]
  }
  const move = (e) => {
    if (!last.current) return
    const g = ref.current.getContext('2d')
    const p = at(e)
    g.lineWidth = 4
    g.lineCap = 'round'
    g.strokeStyle = '#fff'
    g.beginPath()
    g.moveTo(...last.current)
    g.lineTo(...p)
    g.stroke()
    last.current = p
    onSigned(true)
  }
  const clear = () => {
    const c = ref.current
    c.getContext('2d').clearRect(0, 0, c.width, c.height)
    onSigned(false)
  }
  return (
    <>
      <canvas
        ref={ref}
        width={640}
        height={160}
        className="sig"
        onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); last.current = at(e); move(e) }}
        onPointerMove={move}
        onPointerUp={() => { last.current = null }}
        onPointerCancel={() => { last.current = null }}
      />
      <button className="clear" onClick={clear}>Clear</button>
    </>
  )
}

// Vertical walk-through for the visit; `onFinish` fires once a signature is on file.
export default function Appointment({ onFinish }) {
  const [inches, setInches] = useState(66)
  const [lbs, setLbs] = useState(150)
  const [temp, setTemp] = useState(98.6)
  const [eyes, setEyes] = useState(null)
  const [ears, setEars] = useState(null)
  const [signed, setSigned] = useState(false)

  return (
    <>
      <Scroller className="appt" bg="var(--bg)">
        <section>
          <h3>1. Height &amp; weight</h3>
          <Stepper label="Height" value={inches} text={`${Math.floor(inches / 12)}′ ${inches % 12}″`} onChange={(v) => setInches(Math.max(12, v))} />
          <Stepper label="Weight" value={lbs} text={`${lbs} lb`} onChange={(v) => setLbs(Math.max(1, v))} />
        </section>
        <section>
          <h3>2. Temperature · <b>{temp.toFixed(1)}°F</b></h3>
          <input type="range" min="94" max="106" step="0.1" value={temp} onChange={(e) => setTemp(+e.target.value)} />
        </section>
        <section>
          <h3>3. Eyes</h3>
          <Pair value={eyes} onChange={setEyes} />
        </section>
        <section>
          <h3>4. Ears</h3>
          <Pair value={ears} onChange={setEars} />
        </section>
        <section>
          <h3>5. Signature</h3>
          <Signature onSigned={setSigned} />
        </section>
      </Scroller>
      <div className="foot">
        <button className="pay next" disabled={!signed} onClick={onFinish}>Finish appointment</button>
      </div>
    </>
  )
}
