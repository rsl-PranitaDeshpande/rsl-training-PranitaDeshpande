export function SearchInput({ ref, value, onChange }) {
  return (
    <label className="search-input">
      <span>Search products</span>
      <input
        ref={ref}
        type="search"
        value={value}
        onChange={onChange}
        placeholder="Try “notebook”"
      />
    </label>
  )
}
