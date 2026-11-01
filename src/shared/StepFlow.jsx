import { ArrowLeft } from 'lucide-react'
import './steps.css'

// Left-hand pane for step-by-step UIs: header, a grid of choices (`.item.pick` buttons), and Back/Next.
// Step 0 has no footer (its choices advance on tap) and uses taller tiles.
export default function StepFlow({ nav, titles, step, setStep, ready, nextLabel, onNext, children }) {
  return (
    <>
      <div className="step-head">
        {nav}
        <div>
          <div className="step-n">Step {step + 1} of {titles.length}</div>
          <div className="step-t">{titles[step]}</div>
        </div>
      </div>

      <div className={step ? 'choices' : 'choices big'}>{children}</div>

      {step > 0 && (
        <div className="foot">
          <button className="back" onClick={() => setStep(step - 1)}><ArrowLeft size={26} />Back</button>
          <button className="pay next" disabled={!ready} onClick={onNext}>{nextLabel}</button>
        </div>
      )}
    </>
  )
}
