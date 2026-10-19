import { preconnect, preload } from 'react-dom'

const imageHost = 'https://images.unsplash.com'

export const products = [
  {
    id: 1,
    name: 'Canvas Tote Bag',
    price: 24,
    category: 'Accessories',
    description: 'A simple everyday bag with plenty of room.',
    image: `${imageHost}/photo-1544816155-12df9643f363?auto=format&fit=crop&w=700&q=80`,
  },
  {
    id: 2,
    name: 'Knit Sweater',
    price: 48,
    category: 'Clothing',
    description: 'A comfortable layer for cooler days.',
    image: `${imageHost}/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=700&q=80`,
  },
  {
    id: 3,
    name: 'Ceramic Vase',
    price: 32,
    category: 'Home',
    description: 'A handmade-style vase for flowers or display.',
    image: `${imageHost}/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=700&q=80`,
  },
  {
    id: 4,
    name: 'Daily Notebook',
    price: 12,
    category: 'Stationery',
    description: 'A lined notebook for notes and lists.',
    image: `${imageHost}/photo-1517842645767-c639042777db?auto=format&fit=crop&w=700&q=80`,
  },
]

preconnect(imageHost)
preload(products[0].image, { as: 'image' })

function getProducts() {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(products), 500)
  })
}

export const productsPromise = getProducts()
