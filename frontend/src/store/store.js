import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../redux/auth/authSlice';
import eventReducer from '../redux/event/eventSlice';
import userReducer from '../redux/user/userSlice';

const store = configureStore({
    reducer:{
        auth: authReducer,
        event: eventReducer,
        user: userReducer,
    }
})


export default store;