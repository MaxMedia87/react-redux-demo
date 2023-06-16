import {TodoItem} from "./TodoItem";

export function TodoList({ todos, toggleTodoCompeted, removeTodo }) {
	return (
		<ul>
			{todos.map((todo) => (
				<TodoItem
					key={todo.id}
					removeTodo={removeTodo}
					toggleTodoCompeted={toggleTodoCompeted}
					{...todo}
				/>
			))}
		</ul>
	)
}
