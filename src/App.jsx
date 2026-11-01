import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Delete, Gift, Search, ShoppingCart, Trash2, X } from 'lucide-react'
import { CATEGORIES, ITEMS, REWARDS_DISCOUNT } from './items'
import { play } from './sfx'
import './App.css'

const usd = (cents) => '$' + (cents / 100).toFixed(2)
const fmtPhone = (d) => d.replace(/^(\d{0,3})(\d{0,3})(\d{0,4}).*/, (_, a, b, c) => [a, b, c].filter(Boolean).join('-'))
// Scrollable area that fades out and shows a chevron while there is more below.
function Scroller({ className, bg, children }) {
  const ref = useRef(null)
  const [more, setMore] = useState(false)
  const check = () => {
    const e = ref.current
    setMore(e.scrollTop + e.clientHeight < e.scrollHeight - 4)
  }
  useEffect(check) // content changes on every render, so re-measure
  return (
    <div className="scroll-wrap" style={{ '--bg': bg }}>
      <div ref={ref} className={className} onScroll={check}>{children}</div>
      {more && <div className="fade"><ChevronDown size={28} /></div>}
    </div>
  )
}

let uid = 0 // unique key per cart line
const colorOf = (cat) => CATEGORIES.find((c) => c.id === cat).color

export default function App() {
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState(null) // null = all categories
  const [cart, setCart] = useState([]) // one entry per tap: { uid, item }
  const [done, setDone] = useState(false)
  const [phone, setPhone] = useState('') // set once rewards are applied
  const [entering, setEntering] = useState(null) // digits typed in the modal, null = closed

  const shown = ITEMS.filter(
    (i) => (!cat || i.cat === cat) && i.name.toLowerCase().includes(query.toLowerCase()),
  )
  const linePrice = (i) => Math.round(i.price * (phone ? 1 - REWARDS_DISCOUNT : 1))
  const total = cart.reduce((sum, { item }) => sum + linePrice(item), 0)

  const add = (item) => setCart((c) => [...c, { uid: ++uid, item }])
  const remove = (uid) => setCart((c) => c.filter((l) => l.uid !== uid))

  const pay = () => {
    setCart([])
    setPhone('')
    setDone(true)
    setTimeout(() => setDone(false), 3000)
  }

  const clickSound = (e) => {
    const b = e.target.closest('button')
    if (b && !b.disabled) play(b.matches('.item, .cat') ? 'item' : b.classList.contains('pay') ? 'checkout' : 'button')
  }

  return (
    <main className="app" onClickCapture={clickSound}>
      <section className="shop">
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
      </section>

      <aside className="cart">
        <h1>Checkout</h1>
        <Scroller className="lines" bg="#2e2b42">
          {!cart.length && <ShoppingCart className="empty-cart" size={72} />}
          {cart.map(({ uid, item: { name, price, cat: c, icon: Icon } }) => (
            <div key={uid} className="line">
              <Icon size={26} style={{ color: colorOf(c) }} />
              <span className="lname">{name}</span>
              <span className="lprice">
                {usd(linePrice({ price }))}
              </span>
              <button className="qty" onClick={() => remove(uid)}><Trash2 size={22} /></button>
            </div>
          ))}
        </Scroller>
        <div className="total"><span>Total</span><span>{usd(total)}</span></div>
        <button className={phone ? 'rewards on' : 'rewards'} onClick={() => (phone ? setPhone('') : setEntering(''))}>
          <span className="rl"><Gift size={22} />{phone ? fmtPhone(phone) : 'Rewards'}</span>
          {phone && <X size={22} />}
        </button>
        <button className="pay" disabled={!cart.length} onClick={pay}>Checkout</button>
      </aside>

      {entering !== null && (
        <div className="modal">
          <div className="keypad">
            <button className="close" onClick={() => setEntering(null)}><X size={26} /></button>
            <h2>Rewards phone number</h2>
            <div className="digits">{fmtPhone(entering) || '___-___-____'}</div>
            <div className="keys">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'del', 0, 'ok'].map((k) =>
                k === 'del' ? (
                  <button key={k} onClick={() => setEntering((e) => e.slice(0, -1))}><Delete size={28} /></button>
                ) : k === 'ok' ? (
                  <button
                    key={k}
                    className="ok"
                    disabled={entering.length !== 10}
                    onClick={() => { setPhone(entering); setEntering(null) }}
                  >
                    Apply
                  </button>
                ) : (
                  <button key={k} onClick={() => setEntering((e) => (e + k).slice(0, 10))}>{k}</button>
                ),
              )}
            </div>
          </div>
        </div>
      )}

      {done && <div className="thanks" onClick={() => setDone(false)}>Thank you! 🎉</div>}
    </main>
  )
}
