import { IceCreamBowl, IceCreamCone } from 'lucide-react'

// To change the menu: edit these lists. Prices are in cents. `color` tints the tile.
export const CONTAINERS = [
  { id: 'vanilla-cone', name: 'Vanilla Cone', price: 100, color: '#f3e3b0', icon: IceCreamCone },
  { id: 'chocolate-cone', name: 'Chocolate Cone', price: 125, color: '#e0a97a', icon: IceCreamCone },
  { id: 'dish', name: 'Dish', price: 50, color: '#9fd0f0', icon: IceCreamBowl },
]

export const SCOOP_PRICE = 175
export const FLAVORS = [
  { id: 'vanilla', name: 'Vanilla', color: '#f3e3b0' },
  { id: 'chocolate', name: 'Chocolate', color: '#e0a97a' },
  { id: 'strawberry', name: 'Strawberry', color: '#f58fa8' },
  { id: 'mint', name: 'Mint Chip', color: '#7fe0b8' },
  { id: 'cookie', name: 'Cookie Dough', color: '#e8c48f' },
  { id: 'coffee', name: 'Coffee', color: '#d4b08c' },
  { id: 'pistachio', name: 'Pistachio', color: '#b5d977' },
  { id: 'mango', name: 'Mango', color: '#f8b86c' },
]

export const TOPPING_PRICE = 50
export const TOPPINGS = [
  { id: 'sprinkles', name: 'Sprinkles', color: '#f08a80' },
  { id: 'fudge', name: 'Hot Fudge', color: '#e0a97a' },
  { id: 'caramel', name: 'Caramel', color: '#f8b86c' },
  { id: 'whip', name: 'Whipped Cream', color: '#ffffff' },
  { id: 'cherry', name: 'Cherry', color: '#ff7a93' },
  { id: 'nuts', name: 'Nuts', color: '#e8c48f' },
  { id: 'cookie', name: 'Cookie Crumbs', color: '#d4b08c' },
  { id: 'gummy', name: 'Gummy Bears', color: '#b88cff' },
]
