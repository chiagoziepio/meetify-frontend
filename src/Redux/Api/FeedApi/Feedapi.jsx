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
            query : ()=> "feeds/getfeeds"
        })
    }),
    overrideExisting: false
})

export const {useAddFeedMutation, useGetFeedsQuery} = FeedApi