import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import dataSlice from "./DataSlice";


const store = configureStore({
    reducer:{auth:AuthSlice.reducer, data:dataSlice.reducer}
})



export default store;
