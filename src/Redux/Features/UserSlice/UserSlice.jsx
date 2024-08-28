import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user: []
}


const UserSlice = createSlice({
    name: "users",
    initialState,
    reducers: {}
})


export default UserSlice.reducer