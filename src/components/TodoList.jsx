import {useSelector} from "react-redux";
import {TodoItem} from "./TodoItem";

export function TodoList() {
	const todos = useSelector(state => state.todos.todos);
	return (
		<ul>
			{todos.map((todo) => (
				<TodoItem
					key={todo.id}
					{...todo}
				/>
			))}
		</ul>
	)
}
