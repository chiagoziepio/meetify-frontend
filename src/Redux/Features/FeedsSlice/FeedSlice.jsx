import {createSlice} from "@reduxjs/toolkit"
import { FeedApi } from "../../Api/FeedApi/Feedapi"
const initialState = {
    feeds: [],
    loading: false,
    error: null,
    status: "idle"
}

const FeedSlice = createSlice({
    name: "feeds",
    initialState,
    reducers: {},
    extraReducers : (builder)=> {
        builder.addMatcher(FeedApi.endpoints.addFeed.matchPending,(state,action)=>{
            state.loading = true,
            state.status = "loading"
            
        })
        builder.addMatcher(FeedApi.endpoints.addFeed.matchFulfilled,(state,action)=>{
            state.loading = false,
            state.status = "successful",
            state.feeds = action.payload.feeds
        })
        builder.addMatcher(FeedApi.endpoints.addFeed.matchRejected,(state,action)=>{
            state.loading = false,
            state.status = "failed",
            state.error = action.payload.msg
        })
    }
})


export default FeedSlice.reducer