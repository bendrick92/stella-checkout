import { Pizza } from 'lucide-react'
import { TOPPINGS } from './menu'

const EDGE = 'rgba(0,0,0,0.35)'
// Crust ring width and color per crust id.
const CRUST = {
  hand: [14, '#e0a85c'], thin: [7, '#d9a45a'], deep: [20, '#c98a3e'], stuffed: [18, '#e6b56a'], gf: [12, '#e8d3a0'],
}
const PIECES = 12 // per topping
const R_FULL = 100

// Top-down view of the pizza being built. Each topping gets PIECES pieces spread over the pie
// (a sunflower layout shared between toppings, so they interleave instead of piling up).
export function ToppingIcon({ id }) {
  return <svg className="ticon" viewBox="-12 -12 24 24"><Piece id={id} x={0} y={0} rot={0} /></svg>
}

function Piece({ id, x, y, rot }) {
  const t = `translate(${x} ${y}) rotate(${rot})`
  switch (id) {
    case 'pepperoni': return <g transform={t}><circle r="9" fill="#b83227" stroke={EDGE} /><circle cx="-2" cy="-2" r="2" fill="#8c1f18" /><circle cx="3" cy="2" r="1.5" fill="#8c1f18" /></g>
    case 'sausage': return <circle transform={t} r="5" fill="#8a5a3c" stroke={EDGE} />
    case 'bacon': return <rect transform={t} x="-9" y="-2.5" width="18" height="5" rx="2" fill="#d9695f" stroke="#7a2f28" />
    case 'mushroom': return <path transform={t} d="M-8,2 A8,8 0 0 1 8,2 Z M-2,2 h4 v6 h-4 Z" fill="#e9dcc5" stroke={EDGE} />
    case 'onion': return <circle transform={t} r="7" fill="none" stroke="#c9a6f0" strokeWidth="2.5" />
    case 'pepper': return <path transform={t} d="M-8,0 A8,8 0 0 1 8,0" fill="none" stroke="#5fa02a" strokeWidth="3.5" strokeLinecap="round" />
    case 'olive': return <circle transform={t} r="5" fill="none" stroke="#2c2c2c" strokeWidth="3.5" />
    case 'pineapple': return <path transform={t} d="M-7,5 L0,-7 L7,5 Z" fill="#f4d03f" stroke="#b8960c" strokeLinejoin="round" />
    default: return <ellipse transform={t} rx="12" ry="8" fill="#fde9a0" opacity="0.7" /> // extra cheese
  }
}

export default function PizzaPreview({ crust, toppings }) {
  if (!crust) return <Pizza className="empty-cart" size={72} />

  const [ring, ringColor] = CRUST[crust.id]
  const inner = R_FULL - ring
  const chosen = TOPPINGS.filter((t) => toppings.includes(t.id))
  const m = chosen.length
  const N = PIECES * m
  // Extra cheese goes first so it lies under the other toppings.
  const ordered = [...chosen].sort((a, b) => (b.id === 'cheese') - (a.id === 'cheese'))
  const point = (i) => {
    const r = (inner - 12) * Math.sqrt((i + 0.5) / N)
    const a = i * 2.39996
    return [100 + r * Math.cos(a), 100 + r * Math.sin(a)]
  }

  return (
    <svg className="serving" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r={R_FULL} fill={ringColor} stroke={EDGE} />
      {crust.id === 'stuffed' && <circle cx="100" cy="100" r={R_FULL - ring / 2} fill="none" stroke="#fde9a0" strokeWidth="3" opacity="0.8" />}
      <circle cx="100" cy="100" r={inner} fill="#c63d2a" />
      <circle cx="100" cy="100" r={inner - 5} fill="#f7d774" />
      {ordered.map((t, s) => Array.from({ length: PIECES }, (_, i) => {
        const [x, y] = point(i * m + chosen.indexOf(t))
        return <Piece key={`${t.id}${i}`} id={t.id} x={x} y={y} rot={i * 53 + s * 17} />
      }))}
    </svg>
  )
}
