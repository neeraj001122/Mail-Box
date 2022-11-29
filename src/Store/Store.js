import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthReducer";

const store = configureStore({
    reducer:{auth:AuthSlice.reducer}
})

export default store;
