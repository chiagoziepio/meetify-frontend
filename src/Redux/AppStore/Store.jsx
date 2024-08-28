import {configureStore} from "@reduxjs/toolkit"
import FeedReducer from "../Features/FeedsSlice/FeedSlice"
import UserReducers from "../Features/UserSlice/UserSlice"
import {UserApi} from "../Api/UserApi/UserApi"
const Store = configureStore({
    reducer:{
        FeedReducer : FeedReducer,
        UserReducers: UserReducers,
        [UserApi.reducerPath] : UserApi.reducer,
    },
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(UserApi.middleware)
})


export default Store