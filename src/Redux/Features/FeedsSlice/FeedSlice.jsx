import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    feeds: []
}

const FeedSlice = createSlice({
    name: "feeds",
    initialState,
    reducers: {}
})


export default FeedSlice.reducer