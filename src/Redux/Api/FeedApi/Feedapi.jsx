import { UserApi } from "../UserApi/UserApi"

export const FeedApi = UserApi.injectEndpoints({
    endpoints: (builder)=>({
        addFeed : builder.mutation({
            query: (values) => ({
                url: "feeds/addfeed",
                method: 'POST',
                body: values
            })
        }),
        getFeeds : builder.query({
            query : ()=> "feeds/getfeeds",
            pollingInterval: 180000
        }),
        toggleLike : builder.mutation({
            query: (id) => ({
                url: "feeds/togglelike",
                method: 'POST',
                body: id
            })
        }),
        addcomment : builder.mutation({
            query: (values) => ({
                url: "feeds/addcomment",
                method: 'POST',
                body: values
            })
        }),
        deletePost : builder.mutation({
            query: (id) => ({
                url: "feeds/deletepost",
                method: 'POST',
                body: id
            })
        })
    }),
    overrideExisting: false
})

export const {useAddFeedMutation, useGetFeedsQuery,useToggleLikeMutation, useAddcommentMutation, useDeletePostMutation} = FeedApi