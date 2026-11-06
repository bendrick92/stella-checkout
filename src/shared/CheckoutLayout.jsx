import { useState } from 'react'
import { ShoppingCart, Trash2 } from 'lucide-react'
import Scroller from './Scroller'
import { usd } from './format'
import PhonePad from './PhonePad'
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
  const [entering, setEntering] = useState(false) // rewards keypad open after Checkout

  const total = lines.reduce((sum, l) => sum + l.price, 0)

  const pay = () => {
    onPay()
    setEntering(false)
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
        <button className="pay" disabled={!lines.length} onClick={() => (confirm ? setReviewing(true) : setEntering(true))}>Checkout</button>
      </aside>

      {reviewing && (
        <div className="modal">
          <div className="keypad review">
            <h2>How does this look?</h2>
            {confirm}
            <div className="review-btns">
              <button onClick={() => setReviewing(false)}>Change it</button>
              <button className="pay" onClick={() => { setReviewing(false); setEntering(true) }}>Looks good!</button>
            </div>
          </div>
        </div>
      )}

      {entering && <PhonePad onClose={() => setEntering(false)} onSubmit={pay} />}

      {done && <div className="thanks" onClick={() => setDone(false)}>Thank you! 🎉</div>}
    </main>
  )
}
