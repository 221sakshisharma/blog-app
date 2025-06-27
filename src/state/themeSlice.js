import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light"
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggle: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
    }
})

export const { toggle } = themeSlice.actions
export default themeSlice.reducer