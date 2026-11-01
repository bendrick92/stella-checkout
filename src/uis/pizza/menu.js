import { Pizza } from 'lucide-react'

// To change the menu: edit these lists. Prices are in cents.
export const CRUSTS = [
  { id: 'hand', name: 'Hand-Tossed', price: 900, color: '#e8c48f', icon: Pizza },
  { id: 'thin', name: 'Thin & Crispy', price: 900, color: '#f8b86c', icon: Pizza },
  { id: 'deep', name: 'Deep Dish', price: 1100, color: '#f08a80', icon: Pizza },
  { id: 'stuffed', name: 'Stuffed Crust', price: 1200, color: '#f3e3b0', icon: Pizza },
  { id: 'gf', name: 'Gluten-Free', price: 1150, color: '#b5d977', icon: Pizza },
]

export const TOPPING_PRICE = 150
export const TOPPINGS = [
  { id: 'pepperoni', name: 'Pepperoni', color: '#ff7a93' },
  { id: 'sausage', name: 'Sausage', color: '#c08a64' },
  { id: 'bacon', name: 'Bacon', color: '#f08a80' },
  { id: 'mushroom', name: 'Mushrooms', color: '#e8c48f' },
  { id: 'onion', name: 'Onions', color: '#b88cff' },
  { id: 'pepper', name: 'Green Peppers', color: '#b5d977' },
  { id: 'olive', name: 'Olives', color: '#7fe0b8' },
  { id: 'pineapple', name: 'Pineapple', color: '#f8e06c' },
  { id: 'cheese', name: 'Extra Cheese', color: '#f3e3b0' },
]
