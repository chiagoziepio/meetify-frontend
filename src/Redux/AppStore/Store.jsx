import {configureStore} from "@reduxjs/toolkit"
import FeedReducer from "../Features/FeedsSlice/FeedSlice"
import UserReducers from "../Features/UserSlice/UserSlice"
const Store = configureStore({
    reducer:{
        FeedReducer : FeedReducer,
        UserReducers: UserReducers
    }
})


export default Store