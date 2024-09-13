import React from 'react'
import { useSelector } from 'react-redux';

const Media = () => {
  const feeds = useSelector((state) => state.FeedReducers.feeds);
  const User = useSelector((state) => state.UserReducers.user);
  const allFeeds = feeds.map((feed) => feed);
  const userPost = allFeeds.filter((feed) => feed.authorId === User._id);
  return (
    <div className='flex-grow'>
      <div className='mt-[40px]'>
        <h3 className='text-center text-[20px] roboto-bold'>Your Collage</h3>
        <div className='flex flex-wrap p-[10px]'>
          {userPost.map(feed => (
            <div key={feed._id} className='w-[200px] h-[250px] md:w-[260px] md:h-[300px] rounded-[15px]'>
             {feed.postImage ? <img src={feed.postImage} className='h-full w-full'/> : <p className='roboto-medium text-[17px]'>No media to display</p>}
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}

export default Media