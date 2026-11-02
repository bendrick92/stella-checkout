import { useState } from 'react'
import { Delete, ShoppingCart, Trash2, X } from 'lucide-react'
import Scroller from './Scroller'
import { fmtPhone, usd } from './format'
import { play } from './sfx'
import './shared.css'

const clickSound = (e) => {
  const b = e.target.closest('button')
  if (b && !b.disabled) play(b.matches('.item, .cat') ? 'item' : b.classList.contains('pay') ? 'checkout' : 'button')
}

// Shared shell for every UI: `children` is the left-hand shop area, the cart/rewards/pay flow is on the right.
// `theme` is a class from the UI's own css that sets --bg, --accent, --pay and --hi.
// preview: optional node shown in place of the line list (the line still drives total and pay).
// confirm: optional node; when given, Checkout first opens a "How does this look?" review showing it, then the rewards keypad.
// lines: [{ uid, name, sub?, price (cents), icon, color }].
export default function CheckoutLayout({ theme, children, lines, onRemove, onPay, preview, confirm }) {
  const [done, setDone] = useState(false)
  const [reviewing, setReviewing] = useState(false)
  const [entering, setEntering] = useState(null) // rewards digits typed after Checkout, null = closed

  const total = lines.reduce((sum, l) => sum + l.price, 0)

  const pay = () => {
    onPay()
    setEntering(null)
    setDone(true)
    setTimeout(() => setDone(false), 3000)
  }

  return (
    <main className={`app ${theme}`} onClickCapture={clickSound}>
      <section className="shop">{children}</section>

      <aside className="cart">
        <h1>Checkout</h1>
        {preview ? <div className="preview">{preview}</div> : <Scroller className="lines" bg="var(--panel)">
          {!lines.length && <ShoppingCart className="empty-cart" size={72} />}
          {lines.map(({ uid, name, sub, price, icon: Icon, color }) => (
            <div key={uid} className="line">
              <Icon size={26} style={{ color }} />
              <span className="lname">
                {name}
                {sub && <small>{sub}</small>}
              </span>
              <span className="lprice">{usd(price)}</span>
              <button className="qty" onClick={() => onRemove(uid)}><Trash2 size={22} /></button>
            </div>
          ))}
        </Scroller>}
        <div className="total"><span>Total</span><span>{usd(total)}</span></div>
        <button className="pay" disabled={!lines.length} onClick={() => (confirm ? setReviewing(true) : setEntering(''))}>Checkout</button>
      </aside>

      {reviewing && (
        <div className="modal">
          <div className="keypad review">
            <h2>How does this look?</h2>
            {confirm}
            <div className="review-btns">
              <button onClick={() => setReviewing(false)}>Change it</button>
              <button className="pay" onClick={() => { setReviewing(false); setEntering('') }}>Looks good!</button>
            </div>
          </div>
        </div>
      )}

      {entering !== null && (
        <div className="modal">
          <div className="keypad">
            <button className="close" onClick={() => setEntering(null)}><X size={26} /></button>
            <h2>Rewards phone number</h2>
            <div className="digits">{fmtPhone(entering) || '___-___-____'}</div>
            <div className="keys">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'del'].map((k) =>
                k === 'del' ? (
                  <button key={k} onClick={() => setEntering((e) => e.slice(0, -1))}><Delete size={28} /></button>
                ) : k === '' ? (
                  <span key="gap" />
                ) : (
                  <button key={k} onClick={() => setEntering((e) => (e + k).slice(0, 10))}>{k}</button>
                ),
              )}
            </div>
            <button className="submit" disabled={entering.length > 0 && entering.length < 10} onClick={pay}>Submit</button>
          </div>
        </div>
      )}

      {done && <div className="thanks" onClick={() => setDone(false)}>Thank you! 🎉</div>}
    </main>
  )
}
