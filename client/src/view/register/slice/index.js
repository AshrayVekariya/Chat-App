import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Axios
import axios from './../../../axios/interceptor';
import Toast from '../../../components/tostify/Index';

const initialState = {
    allUserList: [],
    loading: false,
    error: '',
    getUser: {}
}

const userSlice = createSlice({
    name: "userSlice",
    initialState: initialState,
    extraReducers: builder => {
        // get All Users
        builder.addCase(getAllUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getAllUser.fulfilled, (state, action) => {
            state.loading = false;
            state.allUserList = action.payload;
            state.error = '';
        });
        builder.addCase(getAllUser.rejected, (state, action) => {
            state.loading = false;
            state.allUserList = [];
            state.error = action.error.message;
        });

        // Create New User
        builder.addCase(createUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.loading = false;
            state.allUserList = action.payload?.payload;
            state.error = '';
        });
        builder.addCase(createUser.rejected, (state, action) => {
            state.loading = false;
            state.allUserList = [];
            state.error = action.error.message;
        });

        // get User By id
        builder.addCase(getUserById.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getUserById.fulfilled, (state, action) => {
            state.loading = false;
            state.getUser = action.payload;
            state.error = '';
        });
        builder.addCase(getUserById.rejected, (state, action) => {
            state.loading = false;
            state.getUser = {};
            state.error = action.error.message;
        });
    }
})

export const getAllUser = createAsyncThunk('getAllUsers', async (payload) => {
    const response = await axios.post('/user/get/all', payload)
        .then(response => response?.data?.data)
        .catch(err => err)
    return response
})

export const createUser = createAsyncThunk('createUser', async (payload, { dispatch }) => {
    const response = await axios.post('/user/create', payload, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(response => {
            Toast(response?.data?.message, "success");
            dispatch(getAllUser());
        })
        .catch(err => Toast(err?.response?.data?.message, "success"))
    return response
})

export const getUserById = createAsyncThunk('getUserById', async (id) => {
    const response = await axios.get(`/user/get/${id}`)
        .then(response => response?.data?.data[0])
        .catch(err => err)
    return response
})

export default userSlice.reducer;