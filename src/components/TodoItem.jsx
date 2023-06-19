import {removeTodo, toggleTodoCompeted} from "../store/todoSlice";
import {useDispatch} from "react-redux";

export function TodoItem({ id, text, completed }) {
	const dispatch = useDispatch();

	return (
		<li key={id}>
			<input type="checkbox" checked={completed} onChange={() => dispatch(toggleTodoCompeted({id}))}/>
			<span>{text}</span>
			<span className={'delete'} onClick={() => dispatch(removeTodo({id}))}>&times;</span>
		</li>
	)
}
