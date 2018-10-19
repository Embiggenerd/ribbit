import React from 'react';

const FollowUserButton = ({
  onClickUnfollowHandler,
  onClickFollowHandler,
  auth,
  followers,
  _user
}) => {
  const followerIds = [];
  for (let follower of followers) {
    followerIds.push(follower._user);
  }
  if (followerIds.indexOf(auth._id) > -1) {
    return (
      <button
        className="teal btn-flat white-text user-options-button"
        onClick={() => onClickUnfollowHandler(_user)}
      >
        Unfollow
      </button>
    );
  } else {
    return (
      <button
        className="teal btn-flat white-text"
        onClick={() => onClickFollowHandler(_user)}
      >
        Follow
      </button>
    );
  }
};

export default FollowUserButton;
