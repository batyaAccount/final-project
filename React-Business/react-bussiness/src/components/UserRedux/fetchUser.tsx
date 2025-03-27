import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../models/User";
const url = 'https://localhost:7160/api/Auth';

export const signIn = createAsyncThunk('Auth/login', async ({ user }: { user: Partial<User>; }, thunkAPI) => {
    try {
        const res = await axios.post(url + '/' + "login", {
            Name: user.name,
            Password: user.password
        });
        return res.data;
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response.data || 'Failed to sign in');
    }

});

export const signUp = createAsyncThunk('Auth/register', async ({ user }: { user: Partial<User>; }, thunkAPI) => {
    try {
        const res = await axios.post(url + '/' + "register", {
            Name: user.name,
            Password: user.password,
            Email: user.email,
            RoleName: user.roleName,
            accountantId: user.accountantId
        });
        debugger

        return res.data;
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response.data || 'Failed to sign up');
    }

});

const loadUserFromSession = (): User | null => {
    const userData = sessionStorage.getItem("user");
    if (userData) {
        return JSON.parse(userData);
    }
    return null;
}
export const userSlice = createSlice({
    name: 'Auth',
    initialState: {
        user: loadUserFromSession() || {} as User,
        loading: false,
        error: ""
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(signIn.fulfilled, (state, action: PayloadAction<{ token: string; user: User; }>) => {
                state.loading = false;
                state.user = action.payload.user;
                state.user.token = action.payload.token;
                sessionStorage.setItem('user', JSON.stringify(state.user));
            })
            .addCase(signIn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch";
            })
            .addCase(signUp.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(signUp.fulfilled, (state, action: PayloadAction<{ token: string; user: User; }>) => {
                state.loading = false;
                state.user = action.payload.user;
                state.user.token = action.payload.token;
                sessionStorage.setItem('user', JSON.stringify(state.user));

            })
            .addCase(signUp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to add";
            });
    }
});

export default userSlice.reducer;