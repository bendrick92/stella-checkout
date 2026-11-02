import { useState } from 'react'
import { Check, Pizza as PizzaIcon } from 'lucide-react'
import CheckoutLayout from '../../shared/CheckoutLayout'
import StepFlow from '../../shared/StepFlow'
import { usd } from '../../shared/format'
import PizzaPreview, { ToppingIcon } from './PizzaPreview'
import './pizza.css'
import { CRUSTS, TOPPINGS, TOPPING_PRICE } from './menu'

const STEPS = ['Choose your crust', 'Add toppings']

export default function Pizza({ nav }) {
  const [step, setStep] = useState(0)
  const [crust, setCrust] = useState(null)
  const [toppings, setToppings] = useState([])

  const c = CRUSTS.find((x) => x.id === crust)
  const price = c ? c.price + toppings.length * TOPPING_PRICE : 0

  const chosen = TOPPINGS.filter((t) => toppings.includes(t.id))
  const reset = () => { setStep(0); setCrust(null); setToppings([]) }
  const toggle = (id) => setToppings((t) => (t.includes(id) ? t.filter((x) => x !== id) : [...t, id]))

  return (
    <CheckoutLayout
      theme="pizza"
      lines={c ? [{ uid: 1, name: 'Pizza', sub: c.name, price, icon: c.icon }] : []}
      preview={<PizzaPreview crust={c} toppings={toppings} />}
      onPay={reset}
      confirm={c && (
        <div className="review-body">
          <div className="review-pic"><PizzaPreview crust={c} toppings={toppings} /></div>
          <ul>
            <li><PizzaIcon size={32} />{c.name} crust</li>
            {chosen.length ? chosen.map((t) => <li key={t.id}><ToppingIcon id={t.id} />{t.name}</li>) : <li>Cheese only</li>}
          </ul>
        </div>
      )}
    >
      <StepFlow
        nav={nav}
        titles={STEPS}
        step={step}
        setStep={setStep}
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
              <ToppingIcon id={id} />
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
