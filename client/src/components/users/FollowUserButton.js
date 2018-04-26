import React from "react"

const FollowUserButton = ({ onClickUnfollowHandler, onClickFollowHandler, _id, followers }) => {
  const followerIds = []
  for(let follower of followers) {
    followerIds.push(follower._user)
  }

  if(followerIds.indexOf(_id)){
    return (
      <button
        className="teal btn-flat right white-text"
        onClick={() => onClickUnfollowHandler(_id)}
      >
        Follow
      </button>
    )
  } else {
    return (
      <button
        className="teal btn-flat right white-text"
        onClick={() => onClickFollowHandler(_id)}
      >
        Follow
      </button>
    )
  }

}

export default FollowUserButton
