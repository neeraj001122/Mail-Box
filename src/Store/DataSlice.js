import { createSlice } from "@reduxjs/toolkit";

const initialValue = {inboxData:[], unreadMessages:0, sentData:[],}

const dataSlice = createSlice({
    name:'DataSlice',
    initialState:initialValue,
    reducers:{
        inboxData(state, action){
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
        },
        deleteSentMail(state, action) {
          const id  = action.payload
          const newArray = [...state.sentData]
          newArray.forEach((item, index) => {
            if(id === item.id)
            {
              newArray.splice(index, 1)
            }
          })
          state.sentData = newArray
        },
        deleteReceivedMail(state, action) {
          const id  = action.payload
          const newArray = [...state.inboxData]
          newArray.forEach((item, index) => {
            if(id === item.id)
            {
              newArray.splice(index, 1)
            }
          })
          state.inboxData = newArray
        }
    }
})


export const dataActions = dataSlice.actions

export default dataSlice;