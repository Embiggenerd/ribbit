import React from 'react'
import store from '../../index'
import { Link } from 'react-router-dom'
// import _ from 'lodash'
//import store from "../../index"

const CommentsList = (props) => {
  const deleteButton = (commentId, commentIndex) => {
    if(props.auth._id === props.blog_user){
      return <button className="right" onClick={()=>props.deleteComment(commentId, commentIndex)}>Delete</button>
    }
  }
  const renderList = () => {
    console.log("globalState: ",store.getState())
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
              <div className="card-content">
                <p className="card-title">{comment.text}</p>
                <p className="right">
                  Posted on: {new Date(comment.datePosted).toLocaleDateString()}
                </p>
              </div>
              <div className="card-action">
                <a>Ribs: {comment.neg}</a>
                <a> Ribbit: {Comment.neg}></a>
                {deleteButton(comment._id)}
              </div>
            </div>
          ))
        }

  }

  return <div>
    {renderList()}
    </div>
}
export default CommentsList
