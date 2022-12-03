import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialValue = {inboxData:[], unreadMessages:0, sentData:[], unreadMessages2:0}

const dataSlice = createSlice({
    name:'DataSlice',
    initialState:initialValue,
    reducers:{
        data(state, action){
          state.inboxData = action.payload
        },
        unreadMessages(state, action){
          state.unreadMessages = action.payload 
        },
        logout1(state){
           state.inboxData = []
        },
        sentData(state,action){
         state.sentData = action.payload
         console.log(state.sentData)
        },
        unreadMessages2(state, action){
          state.unreadMessages2 = action.payload
          console.log(state.unreadMessages2)
        }
    }
})

const email = localStorage.getItem('email')

export const fun = () => {
  return async(dispatch) => {
  const res = await axios.get(
    `https://mail-box-324ea-default-rtdb.firebaseio.com/${email}.json`
  );
  console.log(res)
  const emails = res.data;
  const keys = Object.keys(res.data);
  const arr = [];
  let count = 0;
  for (let key of keys) {
     if(emails[key].status === false)
     {
      count++
     }
    const test = { ...emails[key], key };
    arr.push(test);
  }
  dispatch(data.unreadMessages(count))
  dispatch(data.data(arr));
}
}; 


export const fun2 = () => {
  return async(dispatch) => {
  const res = await axios.get(
    `https://mail-box-324ea-default-rtdb.firebaseio.com/global${email}.json`
  );
  console.log(res)
  const emails = res.data;
  const keys = Object.keys(res.data);
  const arr = [];
  let count = 0;
  for (let key of keys) {
     if(emails[key].status === false)
     {
      count++
     }
    const test = { ...emails[key], key };
    arr.push(test);
  }
  dispatch(data.unreadMessages2(count))
  dispatch(data.sentData(arr));
}
};

export const data = dataSlice.actions

export default dataSlice;