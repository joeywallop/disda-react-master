import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface TodoModel {
    name: string;
}

interface DuckModel {
    todos: TodoModel[]
}

const initialState: DuckModel = {
    todos: []
};

const duckSlice = createSlice(
    {
        name: "duck",
        initialState,
        reducers: {
            addObj: (state, action: PayloadAction<TodoModel>) => {
                state.todos.push(action.payload);
            },

            addTodo: (state, action: PayloadAction<string>) => {
                state.todos.push({ name: action.payload });
            },

            deleteTodo: (state, action: PayloadAction<number>) => {
                state.todos = 
                state.todos.filter((_, index) => index !== action.payload);
            }
        }
    }
);

export const { addTodo, deleteTodo } = duckSlice.actions;
export const duckReducer = duckSlice.reducer;