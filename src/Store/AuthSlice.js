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
       },
       initialMail(state,action){
       const fakeMail=action.payload;
        const apimail = fakeMail.replace('@','').replace('.','')
        state.email=apimail
        localStorage.setItem('email',apimail)   
       },
        logout(state){
            state.isAuth=false;
            localStorage.removeItem('email')
            localStorage.removeItem('token')
            localStorage.removeItem('normEmail')
            state.token=''
            state.email=''
        }
    }
})




export const Auth = AuthSlice.actions;

export default AuthSlice;