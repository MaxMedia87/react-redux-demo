import {useState} from 'react'

import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  const addTodo = () => {
      if (text.trim().length > 0) {
          setTodos([
              ...todos,
              {
                  id: new Date().toISOString(),
                  text,
                  completed: false
              }
          ])
      }
      setText('');
  };

  const toggleTodoCompeted = (todoId) => {
      setTodos(
          todos.map(
              todo => {
                  if (todoId !== todo.id) {
                      return todo;
                  }

                  return {
                      ...todo,
                      completed: !todo.completed
                  }
              }
          )
      );
  }

  const removeTodo = (todoId) => {
      setTodos(todos.filter(todo => todo.id !== todoId))
  };

  return (
    <div className="App">
      <label>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
          <button onClick={addTodo} onChange={onButtonChange}>Добавить</button>
      </label>
        <ul>
            {
                todos.map(todo => <li key={todo.id}>
                    <input type="checkbox" checked={todo.completed} onChange={() => toggleTodoCompeted(todo.id)}/>
                    <span>{todo.text}</span>
                    <span className={'delete'} onClick={() => removeTodo(todo.id)}>&times;</span>
                </li>)
            }
        </ul>
    </div>
  );
}

export default App;
