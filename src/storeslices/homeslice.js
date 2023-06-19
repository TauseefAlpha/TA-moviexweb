import { createSlice } from "@reduxjs/toolkit"


export const homeSlice = createSlice({
    name: "home",
    initialState: {
        geners: {},
        url: {}
    },
    reducers: {

        getConfigurationUrl: (state, action) => {
            state.url = action.payload
        },
        getGeners: (state, action) => {
            state.geners = action.payload
        }
    }

})

export const { getConfigurationUrl, getGeners } = homeSlice.actions

export default homeSlice.reducer