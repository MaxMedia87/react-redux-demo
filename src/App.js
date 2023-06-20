import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";

import {addNewTodo, fetchTodos} from "./store/todoSlice";

import {TodoList} from "./components/TodoList";
import {InputField} from "./components/InputField";
import {Select} from "./components/Select";

import {users} from "./data/users";

import './App.css';

function App() {
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
    <div className="App">
      <Select selectName={'users'} selectId={'users'} options={users} handleSelect={setUser} />
      <InputField text={text} handleInput={setText} handleSubmit={addTask}/>

      {status === 'loading' && <h2>Loading...</h2>}
      {error && <h2>Произошла ошибка {error}</h2>}

      <TodoList />
    </div>
  );
}

export default App;
