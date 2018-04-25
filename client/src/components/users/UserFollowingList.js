import React from "react"
import { Link } from "react-router-dom"

const UserFollowingList = ({ following }) => {
  const renderList = () => (
    following.map(follow => (
      <li key={follow._id} className="collection-item">
        <Link to={`/users/${follow._user}`}>
          {follow.displayName}
        </Link>
      </li>
    ))
  )
  return (
    <ul className="collection with-header">
      <li className="collection-header">
        <h4>Following</h4>
      </li>
      {renderList()}
    </ul>
  )
}

export default UserFollowingList
