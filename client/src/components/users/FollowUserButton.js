import React from "react"

const FollowUserButton = ({ onClickHandler, _id }) => {
  return (
    <button
      className="teal btn-flat right white-text"
      onClick={() => onClickHandler(_id)}
    >
      Follow
    </button>
  )
}

export default FollowUserButton
