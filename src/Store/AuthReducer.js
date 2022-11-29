import { createSlice } from "@reduxjs/toolkit";

const initialAuthState =  {isAuth:false, token:''}

const AuthSlice = createSlice({
    name:'Authentication',
    initialState:initialAuthState,
    reducers:{
       login(state,action){
        state.isAuth=true;
        state.token = action.payload; 
        console.log(state.token)
       }
    }
})

export const Auth = AuthSlice.actions;

export default AuthSlice;