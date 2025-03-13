// reduxStore.ts
import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./fetchUser";

const store = configureStore({
    reducer: {
        Auth: userReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
