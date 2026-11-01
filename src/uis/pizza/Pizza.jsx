import { useState } from 'react'
import { Check } from 'lucide-react'
import CheckoutLayout from '../../shared/CheckoutLayout'
import StepFlow from '../../shared/StepFlow'
import { usd } from '../../shared/format'
import './pizza.css'
import { CRUSTS, TOPPINGS, TOPPING_PRICE } from './menu'

const STEPS = ['Choose your crust', 'Add toppings']
let uid = 0

export default function Pizza({ nav }) {
  const [cart, setCart] = useState([])
  const [step, setStep] = useState(0)
  const [crust, setCrust] = useState(null)
  const [toppings, setToppings] = useState([])

  const c = CRUSTS.find((x) => x.id === crust)
  const price = c ? c.price + toppings.length * TOPPING_PRICE : 0

  const reset = () => { setStep(0); setCrust(null); setToppings([]) }
  const addToOrder = () => {
    const tops = TOPPINGS.filter((t) => toppings.includes(t.id)).map((t) => t.name).join(', ') || 'Cheese'
    setCart((l) => [...l, { uid: ++uid, name: 'Pizza', sub: `${c.name} · ${tops}`, price, icon: c.icon, color: c.color }])
    reset()
  }
  const toggle = (id) => setToppings((t) => (t.includes(id) ? t.filter((x) => x !== id) : [...t, id]))

  return (
    <CheckoutLayout
      theme="pizza"
      lines={cart}
      onRemove={(u) => setCart((l) => l.filter((x) => x.uid !== u))}
      onPay={() => { setCart([]); reset() }}
    >
      <StepFlow
        nav={nav}
        titles={STEPS}
        step={step}
        setStep={setStep}
        ready
        nextLabel={`Add to order · ${usd(price)}`}
        onNext={addToOrder}
      >
        {step === 0 && CRUSTS.map(({ id, name, price: p, color, icon: Icon }) => (
          <button key={id} className="item pick" style={{ color }} onClick={() => { setCrust(id); setStep(1) }}>
            <Icon size={44} />
            <span className="name">{name}</span>
            <span className="price">{usd(p)}</span>
          </button>
        ))}

        {step === 1 && TOPPINGS.map(({ id, name, color }) => {
          const on = toppings.includes(id)
          return (
            <button key={id} className={on ? 'item pick on' : 'item pick'} style={{ color }} onClick={() => toggle(id)}>
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
