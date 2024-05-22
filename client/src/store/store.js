import { configureStore } from '@reduxjs/toolkit'
import userReducer from './../../src/view/register/slice/index'
import messageReducer from './../../src/view/dashboard/slice/dashboardSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        message: messageReducer
    }
})

export default store;