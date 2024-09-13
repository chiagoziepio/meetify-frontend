import {createSlice} from "@reduxjs/toolkit"
import { UserApi } from "../../Api/UserApi/UserApi"
import Cookies from "js-cookie";

const initialState = {
    user: null,
    status: "idle",
    error: null,
    feedback: "",
    screenMode: "white",
    token: null

}

const minutes = 30;
const exprirein = minutes / 1440
const UserSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        changeToDark : (state,action)=>{
            state.screenMode = "black"
        },
        changeToWhite : (state,action)=>{
             state.screenMode = "white"
        }
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
            state.token = action.payload.token,
            Cookies.set("token",JSON.stringify(state.token), {expires: 1/24})
            
            
        })
        builder.addMatcher(UserApi.endpoints.userSignin.matchRejected,(state,action)=>{
            state.status = 'failed'
           
        })
        builder.addMatcher(UserApi.endpoints.userProfilePicUpload.matchPending,(state,action)=>{
            state.status = "loading"
           
        })
        builder.addMatcher(UserApi.endpoints.userProfilePicUpload.matchFulfilled,(state,action)=>{
            state.status = "successful",
            state.user = action.payload.user
            console.log(action.payload.user);
            
            
        })
        builder.addMatcher(UserApi.endpoints.userProfilePicUpload.matchRejected,(state,action)=>{
            state.status = "failed",
            state.error = action.payload.msg
            
            
        })
        builder.addMatcher(UserApi.endpoints.userBackgroundPicUpload.matchPending,(state,action)=>{
            state.status = "loading"
            
            
        })
        builder.addMatcher(UserApi.endpoints.userBackgroundPicUpload.matchFulfilled,(state,action)=>{
            state.status = "successfull",
            state.user = action.payload.user
            
            
        })
        builder.addMatcher(UserApi.endpoints.userBackgroundPicUpload.matchRejected,(state,action)=>{
            state.status = "failed",
            state.error = action.payload.msg
            
            
        })
        builder.addMatcher(UserApi.endpoints.userLogout.matchPending,(state,action)=>{
            state.status = "loading"
        })
        builder.addMatcher(UserApi.endpoints.userLogout.matchFulfilled,(state,action)=>{
            
            state.status = 'successful'
            state.token = action.payload.token,
            state.user = null,
            Cookies.set("token",JSON.stringify(state.token))
        })
        builder.addMatcher(UserApi.endpoints.userLogout.matchRejected,(state,action)=>{
            
            state.status = 'failed'
        })
        builder.addMatcher(UserApi.endpoints.addFriend.matchPending, (state,action)=>{
            state.status = "loading"
        })
        builder.addMatcher(UserApi.endpoints.addFriend.matchFulfilled, (state,action)=>{
            state.status = "successful",
            state.user = action.payload.user
        })
        builder.addMatcher(UserApi.endpoints.addFriend.matchPending, (state,action)=>{
            state.status = "failed"
        })
        builder.addMatcher(UserApi.endpoints.removeFriend.matchPending, (state,action)=>{
            state.status ="loading"
        })
        builder.addMatcher(UserApi.endpoints.removeFriend.matchFulfilled, (state,action)=>{
            state.status ="successfull",
            state.user = action.payload.user
        })
        builder.addMatcher(UserApi.endpoints.removeFriend.matchFulfilled, (state,action)=>{
            state.status ="failed"
        })
        builder.addMatcher(UserApi.endpoints.userEditDetails.matchFulfilled,(state,action)=>{
            state.status = 'successful'
            state.user = action.payload.user
            state.token = action.payload.token,
            Cookies.set("token",JSON.stringify(state.token), {expires: 1/24})
        })
    }
})

export const {changeToDark, changeToWhite} = UserSlice.actions
export default UserSlice.reducer