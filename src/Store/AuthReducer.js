import { createSlice } from "@reduxjs/toolkit";

const initialAuthState =  {isAuth:false, token:'', email:''}

const AuthSlice = createSlice({
    name:'Authentication',
    initialState:initialAuthState,
    reducers:{
       login(state,action){
        state.isAuth=true;
        state.token = action.payload; 
        localStorage.setItem('token',action.payload)
        console.log(state.token)
       },
       initialMail(state,action){
        state.email=action.payload;
        localStorage.setItem('email',action.payload)
        console.log(state.email)
       },
        logout(state){
            state.isAuth=false;
            localStorage.removeItem('email')
            localStorage.removeItem('token')
            state.token=''
            state.email=''
        }
    }
})

export const Auth = AuthSlice.actions;

export default AuthSlice;