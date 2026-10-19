import { useState } from 'react'
import './App.css'
import TodoFilters from './components/TodoFilters.jsx'
import TodoInput from './components/TodoInput.jsx'
import TodoList from './components/TodoList.jsx'

const initialTodos = [
  { id: 'react-basics', description: 'Learn ReactJS basics', completed: true },
  { id: 'practice-react', description: 'Practice ReactJS', completed: false },
  { id: 'learn-redux', description: 'Learn Redux', completed: false },
  { id: 'portfolio', description: 'Code portfolio in React', completed: false },
  { id: 'react-native', description: 'Learn React Native', completed: false },
]

function App() {
  const [todos, setTodos] = useState(initialTodos)
  const [newDescription, setNewDescription] = useState('')
  const [filter, setFilter] = useState('all')

  const visibleTodos = todos.filter((todo) => {
    if (filter === 'done') return todo.completed
    if (filter === 'todo') return !todo.completed
    return true
  })

  function addTodo(event) {
    event.preventDefault()
    setTodos((currentTodos) => [
      ...currentTodos,
      {
        id: crypto.randomUUID(),
        description: newDescription,
        completed: false,
      },
    ])
    setNewDescription('')
  }

  function toggleTodo(id) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: true } : todo,
      ),
    )
  }

  function updateTodo(id, description) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, description } : todo,
      ),
    )
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id))
  }

  return (
    <main className="todo-app">
      <h1 className="page-title">TodoInput</h1>

      <TodoInput
        description={newDescription}
        onDescriptionChange={setNewDescription}
        onAddTodo={addTodo}
      />

      <h2 className="list-title">TodoList</h2>

      {todos.length > 0 && (
        <TodoFilters selectedFilter={filter} onFilterChange={setFilter} />
      )}

      <TodoList
        todos={visibleTodos}
        onCompleteTodo={toggleTodo}
        onUpdateTodo={updateTodo}
        onDeleteTodo={deleteTodo}
      />
    </main>
  )
}

export default App
