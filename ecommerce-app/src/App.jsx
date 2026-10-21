import { useOptimistic, useState, useTransition } from 'react'
import { UserContext } from './context/UserContext'
import { RegistrationForm } from './components/RegistrationForm'
import { ProductList } from './components/ProductList'
import { RegisteredUser } from './components/RegisteredUser'
import './App.css'

function simulateAddToCartRequest() {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (Math.random() < 0.2) {
        reject(new Error('The item could not be added. Please try again.'))
        return
      }

      resolve()
    }, 800)
  })
}

function App() {
  const [registeredUser, setRegisteredUser] = useState(null)
  const [cartCount, setCartCount] = useState(0)
  const [cartError, setCartError] = useState('')
  const [optimisticCartCount, addOptimisticCartItem] = useOptimistic(
    cartCount,
    (count, amount) => count + amount,
  )
  const [isCartPending, startCartTransition] = useTransition()

  function handleAddToCart() {
    setCartError('')
    startCartTransition(async () => {
      addOptimisticCartItem(1)

      try {
        await simulateAddToCartRequest()
        setCartCount((count) => count + 1)
      } catch (error) {
        setCartError(error.message)
      }
    })
  }

  return (
    <UserContext value={registeredUser}>
      <main className="container">
        <title>Simple Store | Everyday Products</title>
        <meta
          name="description"
          content="Browse a small collection of useful everyday products and create an account."
        />

        <header className="site-header">
          <a className="store-name" href="#home">Simple Store</a>
          <nav aria-label="Main navigation">
            <a href="#products">Products</a>
            <a href="#register">Register</a>
            <span className="cart-count" aria-live="polite">
              Cart: {optimisticCartCount}{isCartPending ? ' (updating…)': ''}
            </span>
          </nav>
        </header>

        <section className="intro" id="home">
          <h1>Everyday things, made useful.</h1>
          <p>Browse a few of our favorite items, then create an account to join the store.</p>
        </section>

        <section className="products-section" id="products">
          <h2>Products</h2>
          <ProductList
            onAddToCart={handleAddToCart}
            isCartPending={isCartPending}
            cartError={cartError}
          />
        </section>

        <section className="register-section" id="register">
          <div>
            <h2>Create an account</h2>
            <p>Register to keep your details with the store.</p>
            <RegisteredUser />
          </div>
          <RegistrationForm onRegister={setRegisteredUser} />
        </section>

        <footer className="site-footer">Simple Store · React 19 demo</footer>
      </main>
    </UserContext>
  )
}

export default App
