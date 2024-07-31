import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    role: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  };

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        checkUser : (state, action)=>{
            const userData = sessionStorage.getItem('user');
            if(userData){
              try {
                const parsedUserData = JSON.parse(userData);
                state.user = parsedUserData;
                state.role = parsedUserData.role;
                state.status = 'succeeded';
                state.error = null;
              } catch (error) {
                console.error('Failed to parse user data:', error);
                state.status = 'failed';
                state.error = 'Failed to parse user data';
              }
            }else{
                state.user = null;
                state.role = null;
                state.status = 'failed';
                state.error = action.payload || 'User not found';
            }
        },
        clearUser: (state) =>{
            state.user = null;
            state.role = null;
            state.status = 'idle';
            state.error = null;
        }
    }
  })

export const { checkUser, clearUser } = userSlice.actions;

export default userSlice.reducer;