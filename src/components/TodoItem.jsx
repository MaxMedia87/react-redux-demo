
export function TodoItem({ id, text, completed, toggleTodoCompeted, removeTodo }) {
	return (
		<li key={id}>
			<input type="checkbox" checked={completed} onChange={() => toggleTodoCompeted(id)}/>
			<span>{text}</span>
			<span className={'delete'} onClick={() => removeTodo(id)}>&times;</span>
		</li>
	)
}
