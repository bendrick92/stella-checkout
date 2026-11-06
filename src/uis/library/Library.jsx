import { useEffect, useRef, useState } from 'react'
import { BookOpen, ScanBarcode, Search, Trash2 } from 'lucide-react'
import Scroller from '../../shared/Scroller'
import { play } from '../../shared/sfx'
import { BOOKS, COLORS } from './books'
import { startScanner } from './scanner'
import '../../shared/steps.css'
import '../grocery/grocery.css' // .top and .search
import './library.css'

const colorOf = (title) => COLORS[BOOKS.indexOf(title) % COLORS.length]

export default function Library({ nav }) {
  const [query, setQuery] = useState('')
  const [list, setList] = useState([]) // titles scanned or searched in
  const [done, setDone] = useState(false)
  const [listening, setListening] = useState(false)
  const [err, setErr] = useState('')
  const stop = useRef(null)
  const doneRef = useRef(false) // the Finish jingle must not count as a scan

  const q = query.trim().toLowerCase()
  const shown = q ? BOOKS.filter((b) => b.toLowerCase().includes(q)) : []

  const add = (title) => setList((l) => (l.includes(title) ? l : [...l, title]))
  const remove = (title) => setList((l) => l.filter((t) => t !== title))
  const scan = () => {
    if (doneRef.current) return
    play('item')
    setList((l) => {
      const left = BOOKS.filter((b) => !l.includes(b))
      return left.length ? [...l, left[Math.floor(Math.random() * left.length)]] : l
    })
  }

  const toggleListen = async () => {
    setErr('')
    if (stop.current) { stop.current(); stop.current = null; setListening(false); return }
    try { stop.current = await startScanner(scan); setListening(true) } catch { setErr('Mic not available') }
  }
  useEffect(() => () => stop.current?.(), [])

  const finish = () => {
    play('checkout')
    doneRef.current = true
    setDone(true)
    setTimeout(() => { doneRef.current = false; setDone(false); setList([]); setQuery('') }, 3000)
  }

  return (
    <main className="app library">
      <section className="shop">
        <div className="step-head">
          {nav}
          <div className="step-t">{listening ? 'Scan mode' : 'Find books'}</div>
        </div>
        <div className="top">
          <label className="search">
            <Search size={26} />
            {/* a plain input: the Pi's on-screen keyboard opens on focus */}
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search books..." enterKeyHint="search" />
          </label>
          <button className={`scan${listening ? ' on' : ''}`} onClick={toggleListen}>
            <ScanBarcode size={28} />
            {listening ? 'Stop' : 'Scan'}
          </button>
        </div>
        {err && <div className="err">{err}</div>}
        {listening && (
          <div className="scanning">
            <ScanBarcode size={72} />
            <span>Scan a book!</span>
          </div>
        )}
        <div className="results">
          {shown.map((title) => (
            <button key={title} className="item" style={{ color: colorOf(title) }} onClick={() => add(title)}>
              <BookOpen size={36} />
              <span className="name">{title}</span>
            </button>
          ))}
          {q && !shown.length && <div className="empty">No books found</div>}
        </div>
      </section>

      <aside className="cart">
        <h1>Checkout</h1>
        <Scroller className="lines" bg="var(--panel)">
          {!list.length && <BookOpen className="empty-cart" size={72} />}
          {list.map((title) => (
            <div key={title} className="line">
              <BookOpen size={26} style={{ color: colorOf(title) }} />
              <span className="lname">{title}</span>
              <button className="qty" onClick={() => remove(title)}><Trash2 size={22} /></button>
            </div>
          ))}
        </Scroller>
        <button className="pay" disabled={!list.length} onClick={finish}>Finish</button>
      </aside>

      {done && <div className="thanks" onClick={() => setDone(false)}>Thank you! 🎉</div>}
    </main>
  )
}
