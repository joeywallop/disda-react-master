import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface AuthModel {
    token: string;
    isLogedIn: boolean;
}

const initialState: AuthModel = {
    token: "",
    isLogedIn: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<AuthModel>) => {
            state.isLogedIn = action.payload.isLogedIn;
            state.token = action.payload.token;
        },
        loginSuccess: (state, action: PayloadAction<string>) => {
            state.isLogedIn = true;
            state.token = action.payload;
        },
        logout: (state) => {
            state.isLogedIn = false;
            state.token = "";
        }
    }
});

export const { loginSuccess, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;