import { useState } from 'react'
import { Delete, Gift, ShoppingCart, Trash2, X } from 'lucide-react'
import Scroller from './Scroller'
import { fmtPhone, usd } from './format'
import { play } from './sfx'
import './shared.css'

// Any 10-digit phone number is accepted; members get this fraction off every line.
export const REWARDS_DISCOUNT = 0.1

const clickSound = (e) => {
  const b = e.target.closest('button')
  if (b && !b.disabled) play(b.matches('.item, .cat') ? 'item' : b.classList.contains('pay') ? 'checkout' : 'button')
}

// Shared shell for every UI: `children` is the left-hand shop area, the cart/rewards/pay flow is on the right.
// lines: [{ uid, name, sub?, price (cents), icon, color }].
export default function CheckoutLayout({ children, lines, onRemove, onPay }) {
  const [done, setDone] = useState(false)
  const [phone, setPhone] = useState('') // set once rewards are applied
  const [entering, setEntering] = useState(null) // digits typed in the modal, null = closed

  const linePrice = (price) => Math.round(price * (phone ? 1 - REWARDS_DISCOUNT : 1))
  const total = lines.reduce((sum, l) => sum + linePrice(l.price), 0)

  const pay = () => {
    onPay()
    setPhone('')
    setDone(true)
    setTimeout(() => setDone(false), 3000)
  }

  return (
    <main className="app" onClickCapture={clickSound}>
      <section className="shop">{children}</section>

      <aside className="cart">
        <h1>Checkout</h1>
        <Scroller className="lines" bg="#2e2b42">
          {!lines.length && <ShoppingCart className="empty-cart" size={72} />}
          {lines.map(({ uid, name, sub, price, icon: Icon, color }) => (
            <div key={uid} className="line">
              <Icon size={26} style={{ color }} />
              <span className="lname">
                {name}
                {sub && <small>{sub}</small>}
              </span>
              <span className="lprice">{usd(linePrice(price))}</span>
              <button className="qty" onClick={() => onRemove(uid)}><Trash2 size={22} /></button>
            </div>
          ))}
        </Scroller>
        <div className="total"><span>Total</span><span>{usd(total)}</span></div>
        <button className={phone ? 'rewards on' : 'rewards'} onClick={() => (phone ? setPhone('') : setEntering(''))}>
          <span className="rl"><Gift size={22} />{phone ? fmtPhone(phone) : 'Rewards'}</span>
          {phone && <X size={22} />}
        </button>
        <button className="pay" disabled={!lines.length} onClick={pay}>Checkout</button>
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
