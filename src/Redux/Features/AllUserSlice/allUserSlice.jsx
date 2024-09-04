import {createSlice} from "@reduxjs/toolkit"
import { UserApi } from "../../Api/UserApi/UserApi"

const allUserSlice = createSlice({
    name: "allUsers",
    initialState: {
        allUsers: null
    },
    reducers:{},
    extraReducers: (builder)=>{
            builder.addMatcher(UserApi.endpoints.getAllUser.matchFulfilled,(state,action)=>{
                state.allUsers = action.payload.msg
            })
    }
})

export default  allUserSlice.reducer