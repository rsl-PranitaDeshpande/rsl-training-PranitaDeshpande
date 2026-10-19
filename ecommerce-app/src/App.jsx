import { useState } from 'react'
import { UserContext } from './context/UserContext'
import { RegistrationForm } from './components/RegistrationForm'
import { ProductList } from './components/ProductList'
import { RegisteredUser } from './components/RegisteredUser'
import './App.css'

function App() {
  const [registeredUser, setRegisteredUser] = useState(null)

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
          </nav>
        </header>

        <section className="intro" id="home">
          <h1>Everyday things, made useful.</h1>
          <p>Browse a few of our favorite items, then create an account to join the store.</p>
        </section>

        <section className="products-section" id="products">
          <h2>Products</h2>
          <ProductList />
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
