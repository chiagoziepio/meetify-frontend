import {createSlice} from "@reduxjs/toolkit"
import { UserApi } from "../../Api/UserApi/UserApi"

const allUserSlice = createSlice({
    name: "allUsers",
    initialState: {
        allUsers: null,
        status: "loading",
        activeUsers : []
    },
    reducers:{
        updateUser : (state,action)=>{
            state.activeUsers = action.payload
        },
        getAllUsersAtInterval : (state,action)=>{
            state.status = "success"
            state.allUsers = action.payload
        },
        adminUpdateUsers : (state,action)=>{
            state.allUsers = action.payload
        }
    },
    extraReducers: (builder)=>{
            builder.addMatcher(UserApi.endpoints.getAllUser.matchPending,(state,action)=>{
                state.status = "loading"
            })
            builder.addMatcher(UserApi.endpoints.getAllUser.matchFulfilled,(state,action)=>{
                state.status = "success"
                state.allUsers = action.payload.msg
            })
            builder.addMatcher(UserApi.endpoints.getAllUser.matchRejected,(state,action)=>{
                state.status = "failed"
            })
            builder.addMatcher(UserApi.endpoints.getActiveUser.matchFulfilled,(state,action)=>{
                state.activeUsers = action.payload.msg
            })
    }
})

export const {updateUser ,  getAllUsersAtInterval,  adminUpdateUsers} = allUserSlice.actions
export default  allUserSlice.reducer