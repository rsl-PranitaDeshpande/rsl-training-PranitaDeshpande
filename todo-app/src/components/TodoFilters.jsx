const filters = [
  { id: 'all', label: 'All' },
  { id: 'done', label: 'Done' },
  { id: 'todo', label: 'Todo' },
]

function TodoFilters({ selectedFilter, onFilterChange }) {
  return (
    <nav className="filters" aria-label="Filter tasks">
      {filters.map((filter) => (
        <button
          key={filter.id}
          className={`filter-button${selectedFilter === filter.id ? ' is-selected' : ''}`}
          type="button"
          aria-pressed={selectedFilter === filter.id}
          onClick={() => onFilterChange(filter.id)}
        >
          {filter.label}
        </button>
      ))}
    </nav>
  )
}

export default TodoFilters
