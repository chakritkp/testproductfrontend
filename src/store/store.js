import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import productReducer from "./slices/productSlice";

const store = configureStore({
    reducer: {
        product: productReducer,
    },
    middleware: [...getDefaultMiddleware(), thunk]
})

export default store;