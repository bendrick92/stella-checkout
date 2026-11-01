import { useState } from 'react'
import { IceCreamCone, Pizza as PizzaIcon, ShoppingBasket } from 'lucide-react'
import Grocery from './uis/grocery/Grocery'
import IceCream from './uis/icecream/IceCream'
import Pizza from './uis/pizza/Pizza'

// To add a UI: create it under uis/, render it inside CheckoutLayout, and list it here.
const UIS = [
  { id: 'grocery', name: 'Grocery', icon: ShoppingBasket, Component: Grocery },
  { id: 'icecream', name: 'Ice Cream', icon: IceCreamCone, Component: IceCream },
  { id: 'pizza', name: 'Pizza', icon: PizzaIcon, Component: Pizza },
]

export default function App() {
  const [id, setId] = useState(UIS[0].id)
  const { Component } = UIS.find((u) => u.id === id)
  const nav = (
    <div className="nav">
      {UIS.map(({ id: uid, name, icon: Icon }) => (
        <button key={uid} className={uid === id ? 'on' : ''} aria-label={name} onClick={() => setId(uid)}>
          <Icon size={24} />
        </button>
      ))}
    </div>
  )
  // key remounts on switch so each UI starts with a clean cart
  return <Component key={id} nav={nav} />
}
