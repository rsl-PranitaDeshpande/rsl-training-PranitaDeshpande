function TodoInput({ description, onDescriptionChange, onAddTodo }) {
  return (
    <form className="todo-entry" onSubmit={onAddTodo}>
      <label className="input-label" htmlFor="new-todo">
        <span aria-hidden="true">▤</span>
      </label>
      <input
        id="new-todo"
        type="text"
        placeholder="New Todo"
        value={description}
        onChange={(event) => onDescriptionChange(event.target.value)}
      />
      <button className="add-button" type="submit">
        Add new task
      </button>
    </form>
  )
}

export default TodoInput
