import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import Appointment from './Appointment'
import { REASONS } from './menu'
import { play } from '../../shared/sfx'
import '../../shared/steps.css'
import './clinic.css'

const STEPS = ["Enter the patient's name", 'Reason for visit', 'Check in', 'Appointment']

export default function Clinic({ nav }) {
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [reason, setReason] = useState(null)
  const [done, setDone] = useState(false) // goodbye splash after the appointment

  const r = REASONS.find((x) => x.id === reason)
  const reset = () => { setDone(false); setStep(0); setName(''); setReason(null) }

  return (
    <main className="app clinic">
      <section className="shop">
        <div className="step-head">
          {nav}
          <div>
            <div className="step-n">Step {step + 1} of {STEPS.length}</div>
            <div className="step-t">{STEPS[step]}</div>
          </div>
        </div>

        {step === 0 && (
          <>
            {/* Input and Next share a row at the top so the on-screen keyboard can't cover Next. */}
            <form className="name-row" onSubmit={(e) => { e.preventDefault(); if (name.trim()) setStep(1) }}>
              <input
                autoFocus
                className="name-input"
                value={name}
                placeholder="Patient name"
                autoCapitalize="words"
                autoComplete="off"
                autoCorrect="off"
                onChange={(e) => setName(e.target.value)}
              />
              <button className="pay next" disabled={!name.trim()}>Next</button>
            </form>
          </>
        )}

        {step === 1 && (
          <>
            <div className="choices big">
              {REASONS.map(({ id, name: n, color, icon: Icon }) => (
                <button key={id} className="item pick" style={{ color }} onClick={() => { setReason(id); setStep(2) }}>
                  <Icon size={44} />
                  <span className="name">{n}</span>
                </button>
              ))}
            </div>
            <div className="foot">
              <button className="back" onClick={() => setStep(0)}><ArrowLeft size={26} />Back</button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="summary">
              <div className="who">{name.trim()}</div>
              <div className="why"><r.icon size={34} style={{ color: r.color }} />{r.name}</div>
            </div>
            <div className="foot">
              <button className="back" onClick={() => setStep(1)}><ArrowLeft size={26} />Back</button>
              <button className="pay next" onClick={() => setStep(3)}>Check in</button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="who-bar"><span>{name.trim()}</span><span style={{ color: r.color }}>{r.name}</span></div>
            <Appointment onFinish={() => { play('checkout'); setDone(true) }} />
          </>
        )}
      </section>

      {done && <div className="thanks" onClick={reset}>See you next time, {name.trim().split(' ')[0]}! 👋</div>}
    </main>
  )
}
