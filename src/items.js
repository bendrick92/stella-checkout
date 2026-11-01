// To change the store: edit these lists. `icon` is any lucide icon name (https://lucide.dev/icons).
// Prices are in cents. `cat` must match a category id.
import {
  Apple, Banana, Beef, Bean, Cake, Candy, Carrot, Cherry, Citrus, Cookie, Croissant,
  Drumstick, Egg, Fish, Ham, Grape, IceCream, Leaf, Milk, Nut, Pizza, Popcorn,
  Salad, Sandwich, ShoppingCart, Soup, Wheat, Coffee, Donut, CupSoda, Cherry as Berry,
  Vegan, CakeSlice,
} from 'lucide-react'

// Rewards members get this fraction off every item (any 10-digit phone number is accepted).
export const REWARDS_DISCOUNT = 0.1

export const CATEGORIES = [
  { id: 'general', name: 'General', icon: ShoppingCart, color: '#a06cf0' },
  { id: 'fruit', name: 'Fruits', icon: Grape, color: '#6cb4f8' },
  { id: 'veg', name: 'Veggies', icon: Carrot, color: '#f8b86c' },
  { id: 'pastry', name: 'Pastry', icon: Croissant, color: '#e8c48f' },
  { id: 'meat', name: 'Meat', icon: Drumstick, color: '#f08a80' },
]

export const ITEMS = [
  { id: 'milk', name: 'Milk', cat: 'general', price: 123, icon: Milk },
  { id: 'eggs', name: 'Eggs', cat: 'general', price: 350, icon: Egg },
  { id: 'cereal', name: 'Cereal', cat: 'general', price: 299, icon: Wheat },
  { id: 'soup', name: 'Soup', cat: 'general', price: 189, icon: Soup },
  { id: 'juice', name: 'Juice', cat: 'general', price: 249, icon: CupSoda },
  { id: 'coffee', name: 'Coffee', cat: 'general', price: 599, icon: Coffee },
  { id: 'nuts', name: 'Nuts', cat: 'general', price: 449, icon: Nut },
  { id: 'beans', name: 'Beans', cat: 'general', price: 129, icon: Bean },
  { id: 'popcorn', name: 'Popcorn', cat: 'general', price: 219, icon: Popcorn },
  { id: 'icecream', name: 'Ice Cream', cat: 'general', price: 399, icon: IceCream },
  { id: 'candy', name: 'Candy', cat: 'general', price: 149, icon: Candy },
  { id: 'pizza', name: 'Pizza', cat: 'general', price: 549, icon: Pizza },

  { id: 'apple', name: 'Apple', cat: 'fruit', price: 94, icon: Apple },
  { id: 'banana', name: 'Banana', cat: 'fruit', price: 39, icon: Banana },
  { id: 'orange', name: 'Orange', cat: 'fruit', price: 79, icon: Citrus },
  { id: 'grapes', name: 'Grapes', cat: 'fruit', price: 399, icon: Grape },
  { id: 'cherries', name: 'Cherries', cat: 'fruit', price: 499, icon: Cherry },
  { id: 'berries', name: 'Berries', cat: 'fruit', price: 349, icon: Berry },

  { id: 'carrot', name: 'Carrot', cat: 'veg', price: 59, icon: Carrot },
  { id: 'salad', name: 'Salad', cat: 'veg', price: 249, icon: Salad },
  { id: 'lettuce', name: 'Lettuce', cat: 'veg', price: 169, icon: Leaf },
  { id: 'broccoli', name: 'Broccoli', cat: 'veg', price: 189, icon: Vegan },

  { id: 'bread', name: 'Bread', cat: 'pastry', price: 279, icon: Sandwich },
  { id: 'croissant', name: 'Croissant', cat: 'pastry', price: 149, icon: Croissant },
  { id: 'cookie', name: 'Cookie', cat: 'pastry', price: 99, icon: Cookie },
  { id: 'donut', name: 'Donut', cat: 'pastry', price: 129, icon: Donut },
  { id: 'cake', name: 'Cake', cat: 'pastry', price: 899, icon: Cake },
  { id: 'cakeslice', name: 'Cake Slice', cat: 'pastry', price: 349, icon: CakeSlice },

  { id: 'chicken', name: 'Chicken', cat: 'meat', price: 799, icon: Drumstick },
  { id: 'beef', name: 'Beef', cat: 'meat', price: 1199, icon: Beef },
  { id: 'ham', name: 'Ham', cat: 'meat', price: 649, icon: Ham },
  { id: 'fish', name: 'Fish', cat: 'meat', price: 999, icon: Fish },
]
