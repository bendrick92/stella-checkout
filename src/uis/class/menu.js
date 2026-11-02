import { Waves, Music, Sparkles, Shirt, Bath, Footprints, Crown, Heart, Star, Droplets, Fish, Music2, Smile, Flower2, Wind, Layers, PawPrint } from 'lucide-react'

// To change the schedule: edit this list. `items` is what to pack; `activities` is the order of the class, top to bottom.
export const CLASSES = [
  { id: 'swim', name: 'Swim Class', time: '9:00', color: '#8fd3ff', icon: Waves,
    items: [{ name: 'Swimsuit', icon: Shirt }, { name: 'Clothes', icon: Shirt }, { name: 'Towel', icon: Bath }, { name: 'Water', icon: Droplets }],
    activities: [{ name: 'Blow bubbles', icon: Wind }, { name: 'Kick kick kick', icon: Waves }, { name: 'Float like a fish', icon: Fish }, { name: 'Splash!', icon: Droplets }] },
  { id: 'ballet', name: 'Ballet', time: '11:00', color: '#ff9ccf', icon: Sparkles,
    items: [{ name: 'Ballet shoes', icon: Footprints }, { name: 'Tutu', icon: Crown }, { name: 'Tights', icon: Layers }, { name: 'Stuffy', icon: PawPrint }, { name: 'Water', icon: Droplets }],
    activities: [{ name: 'Stretch', icon: Flower2 }, { name: 'Tippy toes', icon: Footprints }, { name: 'Twirl', icon: Sparkles }, { name: 'Take a bow', icon: Smile }] },
  { id: 'dance', name: 'Dance Class', time: '1:30', color: '#f8e06c', icon: Music,
    items: [{ name: 'Dance shoes', icon: Footprints }, { name: 'Sparkles', icon: Star }, { name: 'Water', icon: Droplets }, { name: 'Hugs', icon: Heart }],
    activities: [{ name: 'Warm up', icon: Flower2 }, { name: 'Follow the music', icon: Music2 }, { name: 'Freeze dance', icon: Star }, { name: 'Group hug', icon: Heart }] },
]

// To change who can show up: edit this list. Each class picks ROSTER_SIZE of them at random.
export const NAMES = [
  'Ava', 'Mia', 'Zoe', 'Lily', 'Emma', 'Ella', 'Nora', 'Ruby', 'Ivy', 'Luna', 'Maya', 'Chloe',
  'Liam', 'Noah', 'Owen', 'Eli', 'Leo', 'Max', 'Finn', 'Jack', 'Theo', 'Sam', 'Ben', 'Cole',
]
export const ROSTER_SIZE = 6
