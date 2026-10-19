import { Component, Suspense, use } from 'react'
import { productsPromise } from '../data/products'

function ProductCard({ product, loading }) {
  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} loading={loading} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="product-meta">
        <span>{product.category}</span>
        <strong>${product.price.toFixed(2)}</strong>
      </div>
    </article>
  )
}

function ProductCards() {
  const productList = use(productsPromise)

  return (
    <div className="product-list">
      {productList.map((product, index) => (
        <ProductCard key={product.id} product={product} loading={index === 0 ? 'eager' : 'lazy'} />
      ))}
    </div>
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

export function ProductList() {
  return (
    <ProductErrorBoundary>
      <Suspense fallback={<ProductLoading />}>
        <ProductCards />
      </Suspense>
    </ProductErrorBoundary>
  )
}
