import React from "react"
import { Link } from "react-router-dom"

const userCommentsList = ({ comments }) => {
  const renderComments = () => {
    return comments.map(comment => (
      <li key={comment._id} className="collection-item">
        <Link to={`/blogs/${comment._blog}/#p${comment._id}`}>
          {comment.text}
        </Link>
      </li>
    ))
  }

  return (
    <ul className="collection with-header">
      <li className="header">
        <h4>Comments:</h4>
      </li>
      {renderComments()}
    </ul>
  )
}

export default userCommentsList
