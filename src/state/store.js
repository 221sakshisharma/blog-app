import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import authReducer from "./authSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,
    }
})

export default store;