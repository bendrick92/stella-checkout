import { useState } from 'react'
import { ArrowLeft, Check, IceCreamCone, Minus } from 'lucide-react'
import CheckoutLayout from '../../shared/CheckoutLayout'
import { usd } from '../../shared/format'
import { CONTAINERS, FLAVORS, SCOOP_PRICE, TOPPINGS, TOPPING_PRICE } from './menu'
import './icecream.css'

const STEPS = ['Choose your cone or dish', 'Pick your scoops', 'Add toppings']
const byId = (list, id) => list.find((x) => x.id === id)
let uid = 0

// Joins counted ids as "Vanilla ×2, Mint Chip"
const describeScoops = (scoops) =>
  FLAVORS.filter((f) => scoops.includes(f.id))
    .map((f) => { const n = scoops.filter((s) => s === f.id).length; return n > 1 ? `${f.name} ×${n}` : f.name })
    .join(', ')

export default function IceCream({ nav }) {
  const [cart, setCart] = useState([])
  const [step, setStep] = useState(0)
  const [container, setContainer] = useState(null)
  const [scoops, setScoops] = useState([]) // flavor id per scoop, repeats allowed
  const [toppings, setToppings] = useState([])

  const price = container
    ? byId(CONTAINERS, container).price + scoops.length * SCOOP_PRICE + toppings.length * TOPPING_PRICE
    : 0
  const ready = [container, scoops.length, true][step] // can leave this step?
  const last = step === STEPS.length - 1

  const reset = () => { setStep(0); setContainer(null); setScoops([]); setToppings([]) }
  const addToOrder = () => {
    const c = byId(CONTAINERS, container)
    const tops = TOPPINGS.filter((t) => toppings.includes(t.id)).map((t) => t.name).join(', ')
    const sub = [describeScoops(scoops), tops].filter(Boolean).join(' · ')
    setCart((l) => [...l, { uid: ++uid, name: c.name, sub, price, icon: c.icon, color: c.color }])
    reset()
  }
  const toggleTopping = (id) => setToppings((t) => (t.includes(id) ? t.filter((x) => x !== id) : [...t, id]))
  const dropScoop = (id) => setScoops((s) => { const i = s.lastIndexOf(id); return s.filter((_, j) => j !== i) })

  return (
    <CheckoutLayout
      lines={cart}
      onRemove={(u) => setCart((l) => l.filter((x) => x.uid !== u))}
      onPay={() => { setCart([]); reset() }}
    >
      <div className="step-head">
        {nav}
        <div>
          <div className="step-n">Step {step + 1} of {STEPS.length}</div>
          <div className="step-t">{STEPS[step]}</div>
        </div>
      </div>

      <div className={step ? 'choices' : 'choices big'}>
        {step === 0 && CONTAINERS.map(({ id, name, price: p, color, icon: Icon }) => (
          <button key={id} className={container === id ? 'item pick on' : 'item pick'} style={{ color }} onClick={() => { setContainer(id); setStep(1) }}>
            <Icon size={44} />
            <span className="name">{name}</span>
            <span className="price">{usd(p)}</span>
          </button>
        ))}

        {step === 1 && FLAVORS.map(({ id, name, color }) => {
          const n = scoops.filter((s) => s === id).length
          return (
            <div key={id} className="flavor">
              <button className="item pick" style={{ color }} onClick={() => setScoops((s) => [...s, id])}>
                <IceCreamCone size={28} />
                <span className="name">{name}</span>
                <span className="price">{usd(SCOOP_PRICE)}</span>
                {n > 0 && <span className="badge" data-n={n} />}
              </button>
              {n > 0 && <button className="less" onClick={() => dropScoop(id)}><Minus size={20} /></button>}
            </div>
          )
        })}

        {step === 2 && TOPPINGS.map(({ id, name, color }) => {
          const on = toppings.includes(id)
          return (
            <button key={id} className={on ? 'item pick on' : 'item pick'} style={{ color }} onClick={() => toggleTopping(id)}>
              <span className="name">{name}</span>
              <span className="price">{usd(TOPPING_PRICE)}</span>
              {on && <Check className="tick" size={22} />}
            </button>
          )
        })}
      </div>

      {step > 0 && (
        <div className="foot">
          <button className="back" onClick={() => setStep(step - 1)}><ArrowLeft size={26} />Back</button>
          <button className="pay next" disabled={!ready} onClick={last ? addToOrder : () => setStep(step + 1)}>
            {last ? `Add to order · ${usd(price)}` : `Next · ${usd(price)}`}
          </button>
        </div>
      )}
    </CheckoutLayout>
  )
}
