import {createSlice} from "@reduxjs/toolkit"
import { UserApi } from "../../Api/UserApi/UserApi"
import Cookies from "js-cookie";

const initialState = {
    user: null,
    status: "idle",
    error: null,
    feedback: "",
    token: null

}

const minutes = 30;
const exprirein = minutes / 1440
const UserSlice = createSlice({
    name: "users",
    initialState,
    reducers: {

    },
    extraReducers: (builder)=>{
        builder.addMatcher(UserApi.endpoints.userSignup.matchPending,(state,action)=>{
            state.status = 'loading'
        }),
        builder.addMatcher(UserApi.endpoints.userSignup.matchFulfilled,(state,action)=>{
            state.status = 'successful'
            state.feedback = action.payload.msg
        })
        builder.addMatcher(UserApi.endpoints.userSignup.matchRejected,(state,action)=>{
            state.status = 'failed'
            state.error = action.payload
        })
        builder.addMatcher(UserApi.endpoints.userSignin.matchPending,(state,action)=>{
             state.status = 'loading'
            
        })
        builder.addMatcher(UserApi.endpoints.userSignin.matchFulfilled,(state,action)=>{
            state.status = 'successful'
            state.user = action.payload.user
            state.token = action.payload.user.token,
            Cookies.set("token",JSON.stringify(state.token), {expires: exprirein})
            
            
        })
        builder.addMatcher(UserApi.endpoints.userSignin.matchRejected,(state,action)=>{
            state.status = 'failed'
           
        })
        builder.addMatcher(UserApi.endpoints.userProfilePicUpload.matchPending,(state,action)=>{
            state.status = "loading"
           
        })
        builder.addMatcher(UserApi.endpoints.userProfilePicUpload.matchFulfilled,(state,action)=>{
            state.status = "successful",
            state.user.profilePic = action.payload.url
            
            
        })
        builder.addMatcher(UserApi.endpoints.userProfilePicUpload.matchRejected,(state,action)=>{
            state.status = "loading",
            state.error = action.payload
            
            
        })
    }
})


export default UserSlice.reducer