import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../redux/auth/authSlice';

const store = configureStore({
    reducer:{
        auth: authReducer,
    }
})


export default store;