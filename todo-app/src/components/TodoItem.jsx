import { useState } from 'react'

function TodoItem({ todo, onComplete, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedDescription, setEditedDescription] = useState(todo.description)

  function saveEdit(event) {
    event.preventDefault()
    onUpdate(editedDescription)
    setIsEditing(false)
  }

  function cancelEdit() {
    setEditedDescription(todo.description)
    setIsEditing(false)
  }

  return (
    <li className="todo-row">
      {isEditing ? (
        <form className="edit-form" onSubmit={saveEdit}>
          <input
            aria-label={`Edit ${todo.description || 'task'}`}
            autoFocus
            type="text"
            value={editedDescription}
            onChange={(event) => setEditedDescription(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Escape') cancelEdit()
            }}
          />
          <div className="row-actions">
            <button className="action-button confirm-button" type="submit">
              Confirm
            </button>
            <button
              className="action-button cancel-button"
              type="button"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <span
            className={`todo-description${todo.completed ? ' is-completed' : ''}`}
          >
            {todo.description}
          </span>
          <div className="row-actions">
            <input
              className="completion-checkbox"
              type="checkbox"
              aria-label={`Mark ${todo.description || 'task'} as completed`}
              checked={todo.completed}
              disabled={todo.completed}
              onChange={onComplete}
            />
            {!todo.completed && (
              <button
                className="action-button edit-button"
                type="button"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            )}
            {todo.completed && (
              <button
                className="action-button delete-button"
                type="button"
                onClick={onDelete}
              >
                Delete
              </button>
            )}
          </div>
        </>
      )}
    </li>
  )
}

export default TodoItem
