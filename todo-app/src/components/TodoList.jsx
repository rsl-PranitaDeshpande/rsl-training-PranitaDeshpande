import TodoItem from './TodoItem.jsx'

function TodoList({ todos, onCompleteTodo, onUpdateTodo, onDeleteTodo }) {
  const orderedTodos = [...todos].sort(
    (firstTodo, secondTodo) =>
      Number(secondTodo.completed) - Number(firstTodo.completed),
  )

  if (todos.length === 0) {
    return <p className="empty-message">No todo is available</p>
  }

  return (
    <ul className="todo-list">
      {orderedTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onComplete={() => onCompleteTodo(todo.id)}
          onUpdate={(description) => onUpdateTodo(todo.id, description)}
          onDelete={() => onDeleteTodo(todo.id)}
        />
      ))}
    </ul>
  )
}

export default TodoList
