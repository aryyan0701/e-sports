import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const signupUser = createAsyncThunk('auth/register',async(formData,  { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:5000/api/users/register', formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
              }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const loginUser = createAsyncThunk('auth/login', async(formData, {rejectWithValue})=> {
    try {
        const response = await axios.post('http://localhost:5000/api/users/login', formData);
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})