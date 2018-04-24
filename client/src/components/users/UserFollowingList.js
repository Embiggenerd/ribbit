import React from "react"
import { Link } from "react-router-dom"

const UserFollowingList = ({ following }) => {
  const renderList = () => {
    following.map(follow => (
      <li>
        <Link to={`/users/${follow._user}`}>{follow.DisplayName}</Link>
      </li>
    ))
  }
  return (
    <ul>
      {renderList()}
    </ul>
  )
}

export default UserFollowingList
