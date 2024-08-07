import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../redux/auth/authSlice';
import eventReducer from '../redux/event/eventSlice';
import userReducer from '../redux/user/userSlice';
import newsReducer from '../redux/news/newsSlice';

const store = configureStore({
    reducer:{
        auth: authReducer,
        event: eventReducer,
        user: userReducer,
        news: newsReducer
    }
})


export default store;