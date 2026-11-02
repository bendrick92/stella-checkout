import { HeartPulse, Stethoscope, Baby, Syringe, ClipboardList } from 'lucide-react'

// To change the reasons for a visit: edit this list.
export const REASONS = [
  { id: 'checkup', name: 'Annual Checkup', color: '#7fe0b8', icon: Stethoscope },
  { id: 'sick', name: 'Sick Visit', color: '#ff7a93', icon: HeartPulse },
  { id: 'kids', name: 'Child Visit', color: '#f8e06c', icon: Baby },
  { id: 'vaccine', name: 'Vaccination', color: '#b88cff', icon: Syringe },
  { id: 'followup', name: 'Follow-Up', color: '#8fd3ff', icon: ClipboardList },
]
