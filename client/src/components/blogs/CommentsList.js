import React from 'react'
import store from '../../index'
import { Link } from 'react-router-dom'

const CommentsList = (props) => {
  const deleteButton = (commentId, commentIndex) => {
    if(props.auth._id === props.blog_user){
      return <button id="delete-comment" className="right" onClick={()=>props.deleteComment(commentId, commentIndex)}>Delete</button>
    }
  }
  const renderList = () => {
    switch(props.auth) {
      case null:
        return <div>Checking credentials....</div>
      default:
          return props.commentsList.map(comment => (
            <div
              id={"p"+comment._id}
              key={comment._id}
              className="card blue-grey yellow-text"
              >
              <div id="comment-data" className="card-content">
                <p className="card-title">{comment.text}</p>
                <p className="left">By: <Link to={`/users/${comment._user}`}>{comment._userDisplayName}</Link></p>
                <p className="right">
                  Posted on: {new Date(comment.datePosted).toLocaleDateString()}
                </p>
              </div>
              <div className="card-action">
                <a>Ribs: {comment.neg}</a>
                {deleteButton(comment._id)}
              </div>
            </div>
          ))
        }

  }

  return <div id="comment-list">
    {renderList()}
    </div>
}
export default CommentsList
