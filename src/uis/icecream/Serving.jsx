import { IceCreamCone } from 'lucide-react'
import { FLAVORS, TOPPINGS } from './menu'

const EDGE = 'rgba(0,0,0,0.3)'
const SPRINKLES = ['#ff5d73', '#ffd23f', '#3fd0ff', '#7bdc5f', '#c77dff']
// Fixed spots on the top scoop, relative to its center, for scattered toppings.
const SPOTS = [[-22, -30], [0, -36], [22, -30], [-32, -12], [-10, -20], [12, -18], [32, -12], [0, -4]]
// [dx, depth] pairs for the dripping edge of fudge/caramel; dx sums to -80.
const DRIPS = [[-10, 18], [-14, 38], [-16, 22], [-12, 44], [-14, 24], [-14, 32]]

function Topping({ id, color, cy }) {
  const top = cy - 42
  if (id === 'fudge' || id === 'caramel') {
    const drips = DRIPS.map(([dx, d]) => `q${dx / 2},${d} ${dx},0`).join(' ')
    return <path d={`M60,${cy - 13} A42,42 0 0 1 140,${cy - 13} ${drips} Z`} fill={color} stroke={EDGE} />
  }
  if (id === 'whip') {
    return (
      <g fill="#fff" stroke={EDGE}>
        {[[86, top + 4, 15], [114, top + 4, 15], [100, top - 8, 15]].map(([x, y, r]) => <circle key={x} cx={x} cy={y} r={r} />)}
      </g>
    )
  }
  if (id === 'cherry') {
    return (
      <g>
        <path d={`M100,${top - 6} q4,-18 16,-22`} stroke="#5a7d2a" strokeWidth="3" fill="none" />
        <circle cx="100" cy={top - 4} r="10" fill={color} stroke={EDGE} />
      </g>
    )
  }
  return (
    <g stroke={EDGE} strokeWidth="0.6">
      {SPOTS.map(([dx, dy], i) => {
        const x = 100 + dx, y = cy + dy
        if (id === 'sprinkles') return <rect key={i} x={x - 5} y={y - 1.5} width="10" height="3" rx="1.5" fill={SPRINKLES[i % 5]} transform={`rotate(${i * 47} ${x} ${y})`} />
        if (id === 'nuts') return <ellipse key={i} cx={x} cy={y} rx="6" ry="4" fill={color} transform={`rotate(${i * 40} ${x} ${y})`} />
        if (id === 'gummy') return <g key={i} fill={['#ff5d73', '#7bdc5f', color][i % 3]}><circle cx={x} cy={y} r="4.5" /><circle cx={x - 3} cy={y - 4} r="2" /><circle cx={x + 3} cy={y - 4} r="2" /></g>
        return <circle key={i} cx={x} cy={y} r={3 + (i % 3)} fill={color} /> // cookie crumbs
      })}
    </g>
  )
}

function Scoop({ color, cy }) {
  return (
    <g>
      <ellipse cx="100" cy={cy + 32} rx="46" ry="13" fill={color} stroke={EDGE} />
      <circle cx="100" cy={cy} r="42" fill={color} stroke={EDGE} />
      <ellipse cx="84" cy={cy - 20} rx="10" ry="6" fill="#fff" opacity="0.4" />
    </g>
  )
}

function Container({ isDish, color, rim, H }) {
  return (
    isDish ? (
        <g fill={color} stroke={EDGE}>
          <rect x="80" y={rim + 34} width="40" height="14" rx="4" />
          <path d={`M30,${rim} C30,${rim + 50} 170,${rim + 50} 170,${rim} Z`} />
        </g>
      ) : (
        <g>
          <clipPath id={`cone-${rim}-${H}`}><polygon points={`60,${rim} 140,${rim} 100,${H}`} /></clipPath>
          <polygon points={`60,${rim} 140,${rim} 100,${H}`} fill={color} />
          <g clipPath={`url(#cone-${rim}-${H})`} stroke={EDGE} strokeWidth="2">
            {[0, 1, 2, 3, 4, 5].map((k) => (
              <g key={k}>
                <line x1={40 + k * 24} y1={rim} x2={k * 24 - 20} y2={H} />
                <line x1={40 + k * 24 - 120} y1={H} x2={40 + k * 24 + 40} y2={rim - 40} />
              </g>
            ))}
          </g>
          <polygon points={`60,${rim} 140,${rim} 100,${H}`} fill="none" stroke={EDGE} strokeWidth="1" />
        </g>
      )
  )
}

// Button graphics: the same drawings as the preview, in small standalone svgs.
export const ScoopIcon = ({ color }) => <svg className="gicon" viewBox="52 -46 96 96"><Scoop color={color} cy={0} /></svg>

export const ContainerIcon = ({ id, color }) => (
  <svg className="gicon" viewBox={id === 'dish' ? '25 0 150 50' : '40 0 120 110'}>
    <Container isDish={id === 'dish'} color={color} rim={0} H={id === 'dish' ? 50 : 110} />
  </svg>
)

// A topping shown on a bare vanilla scoop.
export const ToppingIcon = ({ id, color }) => (
  <svg className="gicon" viewBox="52 -76 96 124">
    <Scoop color={FLAVORS[0].color} cy={0} />
    <Topping id={id} color={color} cy={0} />
  </svg>
)

// Live picture of the serving being built: scoops stack upward from the cone/dish, toppings sit on the top scoop.
// container: a CONTAINERS entry or null; scoops: flavor ids bottom-to-top; toppings: topping ids.
export default function Serving({ container, scoops, toppings }) {
  if (!container) return <IceCreamCone className="empty-cart" size={72} />

  const isDish = container.id === 'dish'
  const ch = isDish ? 50 : 110 // container height
  const n = Math.max(scoops.length, 1)
  const H = ch + 48 * n + 56
  const rim = H - ch
  const cy = (i) => rim - (isDish ? 30 : 22) - 48 * i
  const topCy = cy(n - 1)

  return (
    <svg className="serving" viewBox={`0 0 200 ${H}`}>
      <Container isDish={isDish} color={container.color} rim={rim} H={H} />

      {scoops.map((id, i) => <Scoop key={i} color={FLAVORS.find((f) => f.id === id).color} cy={cy(i)} />)}

      {scoops.length > 0 && TOPPINGS.filter((t) => toppings.includes(t.id)).map((t) => <Topping key={t.id} id={t.id} color={t.color} cy={topCy} />)}
    </svg>
  )
}
