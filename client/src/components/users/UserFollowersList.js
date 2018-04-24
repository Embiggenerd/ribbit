import React from "react"
import { Link } from "react-router-dom"

const UserFollowersList = ({ followers }) => {
  const renderList = () => {
    followers.map(follower => (
      <li>
        <Link to={`/users/${follower._user}`}>{follower.DisplayName}</Link>
      </li>
    ))
  }
  return (
    <ul>
      {renderList()}
    </ul>
  )
}

export default UserFollowersList
