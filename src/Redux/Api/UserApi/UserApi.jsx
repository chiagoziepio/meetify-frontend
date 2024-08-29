import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

 export const UserApi = createApi({
    reducerPath: "UserApi",
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:3000/api/user'}),
    endpoints:(builder)=>({
        userSignup : builder.mutation({
            query : (values)=> ({
                url: "/register",
                method: 'POST',
                body: values
            })
        }),
        userSignin : builder.mutation({
            query : (values)=> ({
                url: "/login",
                method: 'POST',
                body: values
            })
        }),
    })
 })

 export const {useUserSignupMutation, useUserSigninMutation} = UserApi