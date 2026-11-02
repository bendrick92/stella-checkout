import { useState } from 'react'
import { Check, IceCreamCone, Minus } from 'lucide-react'
import CheckoutLayout from '../../shared/CheckoutLayout'
import StepFlow from '../../shared/StepFlow'
import { usd } from '../../shared/format'
import { CONTAINERS, FLAVORS, SCOOP_PRICE, TOPPINGS, TOPPING_PRICE } from './menu'
import Serving, { ContainerIcon, ScoopIcon, ToppingIcon } from './Serving'
import './icecream.css'

const STEPS = ['Choose your cone or dish', 'Pick your scoops', 'Add toppings']
const byId = (list, id) => list.find((x) => x.id === id)

export default function IceCream({ nav }) {
  const [step, setStep] = useState(0)
  const [container, setContainer] = useState(null)
  const [scoops, setScoops] = useState([]) // flavor id per scoop, repeats allowed
  const [toppings, setToppings] = useState([])

  const price = container
    ? byId(CONTAINERS, container).price + scoops.length * SCOOP_PRICE + toppings.length * TOPPING_PRICE
    : 0
  const ready = [container, scoops.length][step] // can leave this step?
  const last = step === STEPS.length - 1

  const reset = () => { setStep(0); setContainer(null); setScoops([]); setToppings([]) }
  const toggleTopping = (id) => setToppings((t) => (t.includes(id) ? t.filter((x) => x !== id) : [...t, id]))
  const dropScoop = (id) => setScoops((s) => { const i = s.lastIndexOf(id); return s.filter((_, j) => j !== i) })

  return (
    <CheckoutLayout
      theme="icecream"
      lines={container ? [{ uid: 1, name: byId(CONTAINERS, container).name, price, icon: IceCreamCone }] : []}
      preview={<Serving container={container && byId(CONTAINERS, container)} scoops={scoops} toppings={toppings} />}
      onPay={reset}
    >
      <StepFlow
        nav={nav}
        titles={STEPS}
        step={step}
        setStep={setStep}
        ready={ready}
        nextLabel={last ? undefined : 'Next'} // last step: pay on the right
        onNext={() => setStep(step + 1)}
      >
        {step === 0 && CONTAINERS.map(({ id, name, price: p, color }) => (
          <button key={id} className={container === id ? 'item pick on' : 'item pick'} style={{ color }} onClick={() => { setContainer(id); setStep(1) }}>
            <ContainerIcon id={id} color={color} />
            <span className="name">{name}</span>
            <span className="price">{usd(p)}</span>
          </button>
        ))}

        {step === 1 && FLAVORS.map(({ id, name, color }) => {
          const n = scoops.filter((s) => s === id).length
          return (
            <div key={id} className="flavor">
              <button className="item pick" style={{ color }} onClick={() => setScoops((s) => [...s, id])}>
                <ScoopIcon color={color} />
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
              <ToppingIcon id={id} color={color} />
              <span className="name">{name}</span>
              <span className="price">{usd(TOPPING_PRICE)}</span>
              {on && <Check className="tick" size={22} />}
            </button>
          )
        })}
      </StepFlow>
    </CheckoutLayout>
  )
}
