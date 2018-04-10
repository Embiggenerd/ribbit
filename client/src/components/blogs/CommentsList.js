import React from 'react'
import store from '../../index'
// import _ from 'lodash'

const CommentsList = (props) => {
  const renderList = () => {
    console.log("globalState: ",store.getState())
    return props.commentsList.map(comment => (
      <div
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
          <a className="right"> Ribbit:: {Comment.neg}></a>
        </div>
      </div>
    ))
  }

  return <div>
    {renderList()}
    </div>
}
export default CommentsList
