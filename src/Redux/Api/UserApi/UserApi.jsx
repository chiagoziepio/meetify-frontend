
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const getToken = () => {
    const token = Cookies.get("token");
    return token ? JSON.parse(token) : null;
  };

 export const UserApi = createApi({
    reducerPath: "UserApi",
    baseQuery: fetchBaseQuery({
        baseUrl:'http://localhost:3000/api/user',
        prepareHeaders: (headers) => {
            const token = getToken();
            if (token) {
              headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
          },
        
    }),
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
        userProfilePicUpload : builder.mutation({
            query: (value)=>({
                url: "/profilepicupload",
                method: "POST",
                body: value
            })
        }),
        userBackgroundPicUpload : builder.mutation({
            query: (value)=>({
                url: "/backgroundpicupload",
                method: "POST",
                body: value
            })
        }),
        userLogout : builder.mutation({
            query: ()=>({
                url: "/logout",
                method: "POST"
            
            })
        }),
        getAllUser: builder.query({
            query : ()=> "/getallUser"
        })
    })
 })

 export const {useUserSignupMutation, useUserSigninMutation,useUserProfilePicUploadMutation, useUserBackgroundPicUploadMutation, useUserLogoutMutation, useGetAllUserQuery} = UserApi