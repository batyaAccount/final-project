import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../Login/SignUp";
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
            RoleName: user.roleName
        });
        return res.data;
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response.data || 'Failed to sign up');
    }

});
export const userSlice = createSlice({
    name: 'Auth',
    initialState: {
        user: {} as User,
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
            })
            .addCase(signUp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to add";
            });
    }
});

export default userSlice.reducer;