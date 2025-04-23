import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../models/User";

const url = 'https://final-project-x2ln.onrender.com/api/User/clients/';

export const get = createAsyncThunk('clients', async ({ id }: { id: number; }, thunkAPI) => {
    try {
        const res = await axios.get(url + id);
        return res.data; 
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response.data || 'Failed to fetch data');
    }
});

export const clientsSlice = createSlice({
    name: 'Clients',
    initialState: {
        clients: [] as User[],
        loading: false,
        error: ""
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(get.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(get.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.loading = false;
                state.clients = action.payload;
            })
            .addCase(get.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch";
            });
    }
});

export default clientsSlice.reducer;
