import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async function(_, {rejectWithValue}) {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users/1/todos?_limit=10')

            if (!response.ok) {
                throw new Error('Server Error!');
            }

            return await response.json();
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async function(id, {rejectWithValue, dispatch}) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'DELETE'
            })

            if (!response.ok) {
                throw new Error(`Failed deleted task with id: ${id}. Server Error!`);
            }

            dispatch(removeTodo({id}));
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

export const toggleStatusTodo = createAsyncThunk(
    'todos/toggleStatusTodo',
    async function(id, {rejectWithValue, dispatch, getState}) {
        try {
            //getState возвращает общий State по аналогии с useSelector
            const todo = getState().todos.todos.find(todo => todo.id === id);

            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    completed: !todo.completed,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })

            if (!response.ok) {
                throw new Error(`Failed toggle status task with id: ${id}. Server Error!`);
            }

            //Проверка измененных данных.
            //const data = await response.json();

            dispatch(toggleTodoCompeted({id}));
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

export const addNewTodo = createAsyncThunk(
    'todos/addNewTodo',
    async function(text, {rejectWithValue, dispatch}) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
                method: 'POST',
                body: JSON.stringify({
                    userId: 1,
                    completed: false,
                    title: text
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })

            if (!response.ok) {
                throw new Error(`Failed add task. Server Error!`);
            }

            const data = await response.json();

            dispatch(addTodo(data));
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
}

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        status: null,
        error: null
    },
    reducers: {
        addTodo(state, action) {
            state.todos.push(action.payload)
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
        },
        toggleTodoCompeted(state, action) {
            const toggleTodo = state.todos.find(todo => todo.id === action.payload.id);
            toggleTodo.completed = !toggleTodo.completed;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        });

        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.todos = action.payload;
        });

        builder.addCase(fetchTodos.rejected, setError);
        builder.addCase(deleteTodo.rejected, setError);
        builder.addCase(toggleStatusTodo.rejected, setError);
        builder.addCase(addNewTodo.rejected, setError);
    }
})

const {addTodo, removeTodo, toggleTodoCompeted} = todoSlice.actions;

export default todoSlice.reducer;
