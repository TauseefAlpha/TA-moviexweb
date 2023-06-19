import { configureStore } from "@reduxjs/toolkit"
import homeslice from "../storeslices/homeslice"

export const store = configureStore({
    reducer: {
        home: homeslice
    },
})