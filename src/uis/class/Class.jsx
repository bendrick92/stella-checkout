import { useState } from 'react'
import { ArrowLeft, Check } from 'lucide-react'
import { CLASSES, NAMES, ROSTER_SIZE } from './menu'
import { play } from '../../shared/sfx'
import '../../shared/steps.css'
import './class.css'

const roster = () => [...NAMES].sort(() => Math.random() - 0.5).slice(0, ROSTER_SIZE)

export default function Class({ nav }) {
  const [cls, setCls] = useState(null)
  const [step, setStep] = useState(0) // 0 schedule, 1 pack, 2 attendance, 3 activities
  const [doing, setDoing] = useState([]) // activities checked off
  const [packing, setPacking] = useState([]) // items checked off
  const [kids, setKids] = useState([])
  const [here, setHere] = useState([]) // names checked in
  const [done, setDone] = useState(false)

  const c = CLASSES.find((x) => x.id === cls)
  const start = (id) => { setCls(id); setKids(roster()); setHere([]); setPacking([]); setDoing([]); setStep(1) }
  const tog = (set) => (n) => { play('item'); set((h) => (h.includes(n) ? h.filter((x) => x !== n) : [...h, n])) }
  const toggle = tog(setHere)
  const pack = tog(setPacking)
  const doit = tog(setDoing)
  const reset = () => { setDone(false); setCls(null); setStep(0) }
  const TITLES = ['Pick a class', 'Pack your bag', `${c?.name} attendance`, `${c?.name} activities`]

  return (
    <main className="app class">
      <section className="shop">
        <div className="step-head">
          {nav}
          <div>
            <div className="step-n">Step {step + 1} of 4</div>
            <div className="step-t">{TITLES[step]}</div>
          </div>
        </div>

        {step === 0 && (
          <div className="schedule">
            {CLASSES.map(({ id, name, time, color, icon: Icon }) => (
              <button key={id} className="item" style={{ color }} onClick={() => start(id)}>
                <Icon size={44} />
                <span className="name">{name}</span>
                <span className="time">{time}</span>
              </button>
            ))}
          </div>
        )}

        {step === 1 && (
          <>
            <div className="choices big">
              {c.items.map(({ name, icon: Icon }) => (
                <button key={name} className={`item pick${packing.includes(name) ? ' on' : ''}`} style={{ color: c.color }} onClick={() => pack(name)}>
                  <Icon size={44} />
                  <span className="name">{name}</span>
                  {packing.includes(name) && <Check className="tick" size={26} />}
                </button>
              ))}
            </div>
            <div className="foot">
              <button className="back" onClick={reset}><ArrowLeft size={26} />Back</button>
              <button className="pay next" onClick={() => setStep(2)}>Next</button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="choices roster">
              {kids.map((n) => (
                <button key={n} className={`item pick${here.includes(n) ? ' on' : ''}`} style={{ color: c.color }} onClick={() => toggle(n)}>
                  <span className="name">{n}</span>
                  {here.includes(n) && <Check className="tick" size={26} />}
                </button>
              ))}
            </div>
            <div className="foot">
              <button className="back" onClick={() => setStep(1)}><ArrowLeft size={26} />Back</button>
              <button className="pay next" disabled={!here.length} onClick={() => setStep(3)}>
                Next ({here.length}/{kids.length})
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="schedule">
              {c.activities.map(({ name, icon: Icon }) => (
                <button key={name} className={`item pick${doing.includes(name) ? ' on' : ''}`} style={{ color: c.color }} onClick={() => doit(name)}>
                  <Icon size={44} />
                  <span className="name">{name}</span>
                  {doing.includes(name) && <Check size={36} />}
                </button>
              ))}
            </div>
            <div className="foot">
              <button className="back" onClick={() => setStep(2)}><ArrowLeft size={26} />Back</button>
              <button className="pay next" onClick={() => { play('checkout'); setDone(true) }}>Done</button>
            </div>
          </>
        )}
      </section>

      {done && <div className="thanks" onClick={reset}>{here.length} {here.length === 1 ? 'kid' : 'kids'} here today! 🎉</div>}
    </main>
  )
}
