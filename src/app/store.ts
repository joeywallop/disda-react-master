import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slice/counter-slice';
import { duckReducer } from './slice/duck-slice';
import { authReducer } from './slice/auth-slice';

const store = configureStore({
    reducer: {
        counter: counterReducer,
        duck: duckReducer,
        auth: authReducer,
    }
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;