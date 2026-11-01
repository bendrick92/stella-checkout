import { IceCreamBowl, IceCreamCone } from 'lucide-react'

// To change the menu: edit these lists. Prices are in cents. `color` tints the tile.
export const CONTAINERS = [
  { id: 'vanilla-cone', name: 'Vanilla Cone', price: 100, color: '#f3e3b0', icon: IceCreamCone },
  { id: 'chocolate-cone', name: 'Chocolate Cone', price: 125, color: '#c08a64', icon: IceCreamCone },
  { id: 'dish', name: 'Dish', price: 50, color: '#9fd0f0', icon: IceCreamBowl },
]

export const SCOOP_PRICE = 175
export const FLAVORS = [
  { id: 'vanilla', name: 'Vanilla', color: '#f3e3b0' },
  { id: 'chocolate', name: 'Chocolate', color: '#b0795a' },
  { id: 'strawberry', name: 'Strawberry', color: '#f58fa8' },
  { id: 'mint', name: 'Mint Chip', color: '#7fe0b8' },
  { id: 'cookie', name: 'Cookie Dough', color: '#e8c48f' },
  { id: 'coffee', name: 'Coffee', color: '#a8836a' },
  { id: 'pistachio', name: 'Pistachio', color: '#b5d977' },
  { id: 'mango', name: 'Mango', color: '#f8b86c' },
]

export const TOPPING_PRICE = 50
export const TOPPINGS = [
  { id: 'sprinkles', name: 'Sprinkles', color: '#f08a80' },
  { id: 'fudge', name: 'Hot Fudge', color: '#b0795a' },
  { id: 'caramel', name: 'Caramel', color: '#f8b86c' },
  { id: 'whip', name: 'Whipped Cream', color: '#ffffff' },
  { id: 'cherry', name: 'Cherry', color: '#f0506e' },
  { id: 'nuts', name: 'Nuts', color: '#e8c48f' },
  { id: 'cookie', name: 'Cookie Crumbs', color: '#a8836a' },
  { id: 'gummy', name: 'Gummy Bears', color: '#a06cf0' },
]
