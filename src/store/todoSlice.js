import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async function(_, {rejectWithValue}) {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users/1/todos?_limit=10')

            console.log(response);
            if (!response.ok) {
                throw new Error('Server Error!');
            }

            return await response.json();
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        status: null,
        error: null
    },
    reducers: {
        addTodo(state, action) {
            state.todos.push({
                id: new Date().toISOString(),
                text: action.payload.text,
                completed: false
            })
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

        builder.addCase(fetchTodos.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        });
    }
})

export const {addTodo, removeTodo, toggleTodoCompeted} = todoSlice.actions;

export default todoSlice.reducer;
