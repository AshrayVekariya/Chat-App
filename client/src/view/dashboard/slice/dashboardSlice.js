import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Axios
import axios from './../../../axios/interceptor';
import Toast from '../../../components/tostify/Index';

const initialState = {
    messageList: [],
    loading: false,
    notRedableMessage: [],
    error: '',
}

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: initialState,
    extraReducers: builder => {
        // get All Users
        builder.addCase(getAllMessage.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getAllMessage.fulfilled, (state, action) => {
            state.loading = false;
            state.messageList = action.payload;
            state.error = '';
        });
        builder.addCase(getAllMessage.rejected, (state, action) => {
            state.loading = false;
            state.messageList = [];
            state.error = action.error.message;
        });

        // Create New User
        builder.addCase(createMessage.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createMessage.fulfilled, (state, action) => {
            state.loading = false;
            state.messageList = action.payload?.payload;
            state.error = '';
        });
        builder.addCase(createMessage.rejected, (state, action) => {
            state.loading = false;
            state.messageList = [];
            state.error = action.error.message;
        });

        // get All Not Readable Message
        builder.addCase(unSeenMessageCount.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(unSeenMessageCount.fulfilled, (state, action) => {
            state.loading = false;
            state.notRedableMessage = action.payload;
            state.error = '';
        });
        builder.addCase(unSeenMessageCount.rejected, (state, action) => {
            state.loading = false;
            state.notRedableMessage = [];
            state.error = action.error.message;
        });

        // Read Message update notification
        builder.addCase(readAllMessage.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(readAllMessage.fulfilled, (state, action) => {
            state.loading = false;
            state.messageList = action.payload?.payload;
            state.error = '';
        });
        builder.addCase(readAllMessage.rejected, (state, action) => {
            state.loading = false;
            state.messageList = [];
            state.error = action.error.message;
        });
    }
})

export const getAllMessage = createAsyncThunk('getAllMessage', async (payload) => {
    const response = await axios.post('/message/get', payload)
        .then(response => response?.data?.data)
        .catch(err => Toast(err?.response?.data?.message, "error"))
    return response
})

export const createMessage = createAsyncThunk('createMessage', async (payload, { dispatch }) => {
    const response = await axios.post('/message/send', payload)
        .then(response => {
            dispatch(getAllMessage({ senderId: payload.senderId, reciverId: payload.reciverId }));
        })
        .catch(err => Toast(err?.response?.data?.message, "error"))
    return response
})

export const unSeenMessageCount = createAsyncThunk('unSeenMessageCount', async (payload) => {
    const response = await axios.post('/message/get/not-read', payload)
        .then(response => response?.data?.data)
        .catch(err => Toast(err?.response?.data?.message, "error"))
    return response
})

export const readAllMessage = createAsyncThunk('readAllMessage', async (payload, { dispatch }) => {
    const response = await axios.post('/message/read', payload)
        .then(response => {
            dispatch(getAllMessage(payload));
        })
        .catch(err => Toast(err?.response?.data?.message, "error"))
    return response
})

export default dashboardSlice.reducer;