import { Component, Suspense, use, useCallback, useRef, useState } from 'react'
import { productsPromise } from '../data/products'
import { SearchInput } from './SearchInput'

function ProductCard({ product, loading, onSelect }) {
  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} loading={loading} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="product-meta">
        <span>{product.category}</span>
        <strong>${product.price.toFixed(2)}</strong>
      </div>
      <button className="details-button" onClick={() => onSelect(product)}>
        View details
      </button>
    </article>
  )
}

function ProductDetails({ product, onAddToCart, isCartPending }) {
  const [isHighlighted, setIsHighlighted] = useState(false)
  const detailsRef = useCallback((node) => {
    if (!node) return

    const highlight = () => setIsHighlighted(true)
    const removeHighlight = () => setIsHighlighted(false)
    node.addEventListener('pointerenter', highlight)
    node.addEventListener('pointerleave', removeHighlight)

    return () => {
      node.removeEventListener('pointerenter', highlight)
      node.removeEventListener('pointerleave', removeHighlight)
    }
  }, [])

  return (
    <section
      className={`product-details${isHighlighted ? ' is-highlighted' : ''}`}
      ref={detailsRef}
      aria-labelledby="product-details-heading"
    >
      <img src={product.image} alt={product.name} />
      <div>
        <h3 id="product-details-heading">{product.name}</h3>
        <p className="details-price">${product.price.toFixed(2)}</p>
        <p>{product.description}</p>
        <button
          className="submit-button"
          onClick={onAddToCart}
          disabled={isCartPending}
        >
          {isCartPending ? 'Adding…' : 'Add to cart'}
        </button>
      </div>
    </section>
  )
}

function ProductCards({ searchRef, onAddToCart, isCartPending, cartError }) {
  const productList = use(productsPromise)
  const [search, setSearch] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const filteredProducts = productList.filter((product) =>
    product.name.toLowerCase().includes(search.trim().toLowerCase()),
  )

  return (
    <>
      <SearchInput
        ref={searchRef}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      {cartError && <p className="error-message" role="alert">{cartError}</p>}
      <div className="product-list">
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            loading={index === 0 ? 'eager' : 'lazy'}
            onSelect={setSelectedProduct}
          />
        ))}
        {filteredProducts.length === 0 && (
          <p className="loading-message">No products match that search.</p>
        )}
      </div>
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onAddToCart={onAddToCart}
          isCartPending={isCartPending}
        />
      )}
    </>
  )
}

function ProductLoading() {
  return <p className="loading-message" role="status">Loading products…</p>
}

class ProductErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <p className="error-message" role="alert">
          Products could not be loaded. Please refresh the page and try again.
        </p>
      )
    }

    return this.props.children
  }
}

export function ProductList({ onAddToCart, isCartPending, cartError }) {
  const searchRef = useRef(null)

  return (
    <ProductErrorBoundary>
      <div className="product-tools">
        <button
          className="focus-search-button"
          onClick={() => searchRef.current?.focus()}
        >
          Focus product search
        </button>
      </div>
      <Suspense fallback={<ProductLoading />}>
        <ProductCards
          searchRef={searchRef}
          onAddToCart={onAddToCart}
          isCartPending={isCartPending}
          cartError={cartError}
        />
      </Suspense>
    </ProductErrorBoundary>
  )
}
