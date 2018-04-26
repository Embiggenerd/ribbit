import React from "react"
import { Link } from "react-router-dom"

const UserFollowersList = ({ followers }) => {
  const renderList = () =>
    followers.map(follower => (
      <li key={follower._id} className="collection-item">
        <Link to={`/users/${follower._user}`}>
          {follower.displayName}
        </Link>
      </li>
    ))
  return (
    <ul className="collection with-header">
      <li className="collection-header">
        <h4>Followers</h4>
      </li>
      {renderList()}
    </ul>
  )
}

export default UserFollowersList
