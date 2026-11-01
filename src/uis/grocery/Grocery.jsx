import { useState } from 'react'
import { Search } from 'lucide-react'
import CheckoutLayout from '../../shared/CheckoutLayout'
import Scroller from '../../shared/Scroller'
import { usd } from '../../shared/format'
import { CATEGORIES, ITEMS } from './items'
import './grocery.css'

let uid = 0 // unique key per cart line
const colorOf = (cat) => CATEGORIES.find((c) => c.id === cat).color

export default function Grocery({ nav }) {
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState(null) // null = all categories
  const [cart, setCart] = useState([]) // one entry per tap: { uid, name, price, icon, color }

  const shown = ITEMS.filter(
    (i) => (!cat || i.cat === cat) && i.name.toLowerCase().includes(query.toLowerCase()),
  )

  const add = ({ name, price, icon, cat }) => setCart((c) => [...c, { uid: ++uid, name, price, icon, color: colorOf(cat) }])
  const remove = (uid) => setCart((c) => c.filter((l) => l.uid !== uid))

  return (
    <CheckoutLayout lines={cart} onRemove={remove} onPay={() => setCart([])}>
      <div className="top">
        {nav}
        <label className="search">
          <Search size={26} />
          {/* a plain input: the Pi's on-screen keyboard opens on focus */}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            enterKeyHint="search"
          />
        </label>
      </div>

      <div className="cats">
        {CATEGORIES.map(({ id, name, icon: Icon, color }) => (
          <button
            key={id}
            className={cat === id ? 'cat on' : 'cat'}
            style={{ color }}
            onClick={() => setCat(cat === id ? null : id)}
          >
            <Icon size={34} />
            <span>{name}</span>
          </button>
        ))}
      </div>

      <Scroller className="items" bg="#231f33">
        {shown.map((item) => {
          const { id, name, price, cat: c, icon: Icon } = item
          return (
            <button key={id} className="item" style={{ color: colorOf(c) }} onClick={() => add(item)}>
              <Icon size={44} />
              <span className="name">{name}</span>
              <span className="price">{usd(price)}</span>
            </button>
          )
        })}
        {!shown.length && <p className="empty">Nothing found</p>}
      </Scroller>
    </CheckoutLayout>
  )
}
