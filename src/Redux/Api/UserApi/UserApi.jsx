import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const getToken = () => {
  const token = Cookies.get("token");
  return token ? JSON.parse(token) : null;
};

export const UserApi = createApi({
  reducerPath: "UserApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/",
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    userSignup: builder.mutation({
      query: (values) => ({
        url: "user/register",
        method: "POST",
        body: values,
      }),
    }),
    adminCreateUser: builder.mutation({
      query: (values) => ({
        url: "admin/create",
        method: "POST",
        body: values,
      }),
    }),
    userSignin: builder.mutation({
      query: (values) => ({
        url: "user/login",
        method: "POST",
        body: values,
      }),
    }),
    userProfilePicUpload: builder.mutation({
      query: (value) => ({
        url: "user/profilepicupload",
        method: "POST",
        body: value,
      }),
    }),
    userBackgroundPicUpload: builder.mutation({
      query: (value) => ({
        url: "user/backgroundpicupload",
        method: "POST",
        body: value,
      }),
    }),
    addFriend: builder.mutation({
      query: (id) => ({
        url: "user/addfriend",
        method: "POST",
        body: id,
      }),
    }),
    removeFriend: builder.mutation({
      query: (id) => ({
        url: "user/removefriend",
        method: "POST",
        body: id,
      }),
    }),
    userLogout: builder.mutation({
      query: () => ({
        url: "user/logout",
        method: "POST",
      }),
    }),
    userDeleteAcc: builder.mutation({
      query: () => ({
        url: "user/deleteaccount",
        method: "POST",
      }),
    }),
    userEditDetails: builder.mutation({
      query: (values) => ({
        url: "user/edituser",
        method: "POST",
        body: values,
      }),
    }),
    userResetPwd: builder.mutation({
      query: (values) => ({
        url: "user/resetpassword",
        method: "POST",
        body: values,
      }),
    }),
    userForgotPwd: builder.mutation({
      query: (values) => ({
        url: "user/forgotpassword",
        method: "POST",
        body: values,
      }),
    }),
    PwdResetOutside: builder.mutation({
      query: ({ resetToken, data }) => ({
        url: `user/forgotpassword/${resetToken}`,
        method: "POST",
        body: data,
      }),
    }),
    getAllUser: builder.query({
      query: () => "user/getallUser",
    }),
    getActiveUser: builder.query({
      query: () => "user/getactiveusers",
      pollingInterval: 600000,
    }),
  }),
});

export const {
  useUserSignupMutation,
  useUserSigninMutation,
  useUserProfilePicUploadMutation,
  useUserBackgroundPicUploadMutation,
  useUserLogoutMutation,
  useGetAllUserQuery,
  useAddFriendMutation,
  useRemoveFriendMutation,
  useGetActiveUserQuery,
  useUserEditDetailsMutation,
  useUserResetPwdMutation,
  useUserDeleteAccMutation,
  usePwdResetOutsideMutation,
  useUserForgotPwdMutation,
  useAdminCreateUserMutation
} = UserApi;
