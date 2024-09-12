import {createSlice} from "@reduxjs/toolkit"
import { FeedApi } from "../../Api/FeedApi/Feedapi"
import { message } from "antd"
const initialState = {
    feeds: [],
    loading: false,
    error: null,
    status: "idle",
    feedSize : null,
    feedDiff : false
}

const FeedSlice = createSlice({
    name: "feeds",
    initialState,
    reducers: {
        updateFeeds: (state,action)=>{
            if(action.payload.length > state.feeds.length){
                state.feedDiff = true;
                const diff = action.payload.length - state.feeds.length;
                state.feedSize = diff
            }else{
                state.feedDiff = false;
                state.feedSize = null
            }
            state.loading = false,
            state.status = "successfull",
            state.feeds = action.payload
        }
    },
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
        builder.addMatcher(FeedApi.endpoints.getFeeds.matchPending,(state,action)=>{
            state.loading = true,
            state.status = "loading"
        })
        builder.addMatcher(FeedApi.endpoints.getFeeds.matchFulfilled,(state,action)=>{
            if(action.payload.feeds.length > state.feeds.length){
                state.feedDiff = true;
                const diff = action.payload.feeds.length - state.feeds.length;
                state.feedSize = diff
            }else{
                state.feedDiff = false;
                state.feedSize = null
            }
            state.loading = false,
            state.status = "successfull",
            state.feeds = action.payload.feeds
        })
        builder.addMatcher(FeedApi.endpoints.getFeeds.matchRejected,(state,action)=>{
            state.loading = false,
            state.status = "failed",
            state.error = action.payload.msg
        })
        builder.addMatcher(FeedApi.endpoints.toggleLike.matchPending,(state,action)=>{
            state.loading = true,
            state.status = "loading"
        })
        builder.addMatcher(FeedApi.endpoints.toggleLike.matchFulfilled,(state,action)=>{
            state.loading = false,
            state.status = "successfull",
            state.feeds = action.payload.feeds
        })
        builder.addMatcher(FeedApi.endpoints.toggleLike.matchRejected,(state,action)=>{
            state.loading = false,
            state.status = "failed",
            state.error = action.payload.msg
        })
        builder.addMatcher(FeedApi.endpoints.addcomment.matchPending,(state,action)=>{
             state.loading = true,
            state.status = "loading"
        })
        builder.addMatcher(FeedApi.endpoints.addcomment.matchFulfilled,(state,action)=>{
            state.loading = false,
            state.status = "successfull",
            state.feeds = action.payload.feeds
        })
        builder.addMatcher(FeedApi.endpoints.addcomment.matchRejected,(state,action)=>{
            state.loading = false,
            state.status = "failed",
            state.error = action.payload.msg
        })
        builder.addMatcher(FeedApi.endpoints.deletePost.matchFulfilled,(state,action)=>{
            state.loading = false,
            state.status = "successful",
            state.feeds = action.payload.feeds
        })
    }
})

export const {updateFeeds} = FeedSlice.actions

export default FeedSlice.reducer