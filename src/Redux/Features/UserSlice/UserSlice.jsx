import {createSlice} from "@reduxjs/toolkit"
import { UserApi } from "../../Api/UserApi/UserApi"

const initialState = {
    user: null,
    status: "idle",
    error: null,
    feedback: ""

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
    }
})


export default UserSlice.reducer