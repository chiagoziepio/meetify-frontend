import {createSlice} from "@reduxjs/toolkit"
import { UserApi } from "../../Api/UserApi/UserApi"
import { act } from "react"

const initialState = {
    user: null,
    status: "idle",
    error: null,
    feedback: "",
    accessToken: null

}


const UserSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
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
            state.accessToken = action.payload.accessToken
            
        })
        builder.addMatcher(UserApi.endpoints.userSignin.matchRejected,(state,action)=>{
            state.status = 'failed'
            
            
        })
    }
})


export default UserSlice.reducer