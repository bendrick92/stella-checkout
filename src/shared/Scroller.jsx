import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

// Scrollable area that fades out and shows a chevron while there is more below.
export default function Scroller({ className, bg, children }) {
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
