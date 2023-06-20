import {deleteTodo, toggleStatusTodo} from "../store/todoSlice";
import {useDispatch} from "react-redux";
import {useState} from "react";

export function TodoItem({ id, title, completed }) {
	const dispatch = useDispatch();

	const [disabled, setDisabled] = useState(false);

	const onClick = () => {
		dispatch(deleteTodo(id));
		setDisabled(true);
	};

	return (
		<li key={id}>
			<input type="checkbox" checked={completed} onChange={() => dispatch(toggleStatusTodo(id))}/>
			<span>{title}</span>
			<button className={'delete'} disabled={disabled} onClick={onClick}>&times;</button>
		</li>
	)
}
