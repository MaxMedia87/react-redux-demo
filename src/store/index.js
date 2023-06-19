import {configureStore} from '@reduxjs/toolkit';
import todoReducer from './todoSlice';

export default configureStore({
    reducer: {
        // Задается произвольное имя для reducer
        todos: todoReducer,
    }
})