import { useState } from 'react'
import { BookOpen, IceCreamCone, Stethoscope, GraduationCap, Pizza as PizzaIcon, ShoppingBasket } from 'lucide-react'
import Grocery from './uis/grocery/Grocery'
import IceCream from './uis/icecream/IceCream'
import Pizza from './uis/pizza/Pizza'
import Clinic from './uis/clinic/Clinic'
import Class from './uis/class/Class'
import Library from './uis/library/Library'

// To add a UI: create it under uis/, render it inside CheckoutLayout, and list it here.
const UIS = [
  { id: 'grocery', name: 'Grocery', icon: ShoppingBasket, Component: Grocery },
  { id: 'icecream', name: 'Ice Cream', icon: IceCreamCone, Component: IceCream },
  { id: 'pizza', name: 'Pizza', icon: PizzaIcon, Component: Pizza },
  { id: 'clinic', name: 'Doctor', icon: Stethoscope, Component: Clinic },
  { id: 'class', name: 'Class', icon: GraduationCap, Component: Class },
  { id: 'library', name: 'Library', icon: BookOpen, Component: Library },
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
