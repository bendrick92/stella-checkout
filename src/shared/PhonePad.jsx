import { useState } from 'react'
import { Delete, X } from 'lucide-react'
import { fmtPhone } from './format'

// Rewards phone number modal. onSubmit gets the digits typed (may be empty); onClose cancels.
export default function PhonePad({ onSubmit, onClose }) {
  const [digits, setDigits] = useState('')
  return (
    <div className="modal">
      <div className="keypad">
        <button className="close" onClick={onClose}><X size={26} /></button>
        <h2>Rewards phone number</h2>
        <div className="digits">{fmtPhone(digits) || '___-___-____'}</div>
        <div className="keys">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'del'].map((k) =>
            k === 'del' ? (
              <button key={k} onClick={() => setDigits((e) => e.slice(0, -1))}><Delete size={28} /></button>
            ) : k === '' ? (
              <span key="gap" />
            ) : (
              <button key={k} onClick={() => setDigits((e) => (e + k).slice(0, 10))}>{k}</button>
            ),
          )}
        </div>
        <button className="submit" disabled={digits.length > 0 && digits.length < 10} onClick={() => onSubmit(digits)}>Submit</button>
      </div>
    </div>
  )
}
