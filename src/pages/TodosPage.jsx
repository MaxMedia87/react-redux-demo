import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addNewTodo, fetchTodos} from "../store/todoSlice";
import {Select} from "../components/Select";
import {users} from "../data/users";
import {InputField} from "../components/InputField";
import {TodoList} from "../components/TodoList";

export function TodosPage() {
	const [text, setText] = useState('');
	const [user, setUser] = useState('');

	// state.todos общий state обращение к configureStore
	const {status, error} = useSelector(state => state.todos)
	const dispatch = useDispatch();

	const addTask = () => {
		dispatch(addNewTodo({text, user}))
		setText('')
	};

	useEffect(() => {
		dispatch(fetchTodos())
	},[dispatch])

	return (
		<>
			<Select selectName={'users'} selectId={'users'} options={users} handleSelect={setUser} />
			<InputField text={text} handleInput={setText} handleSubmit={addTask}/>

			{status === 'loading' && <h2>Loading...</h2>}
			{error && <h2>Произошла ошибка {error}</h2>}

			<TodoList />
		</>
	)
}