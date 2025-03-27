// reduxStore.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./fetchUser";
import clientsReducer from "./fetchClients";

const store = configureStore({
    reducer: {
        Auth: userReducer,
        Clients: clientsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
