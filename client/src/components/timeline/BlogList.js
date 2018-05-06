import React from "react"
import { connect } from "react-redux"
import { fetchBlogs, deleteBlog, rib } from "../../actions"
import { Link } from "react-router-dom"
import store from "../../index"
import _ from "lodash"

/*
Simply fetches our current list of blogs by user from DB
required props: auth, blogs, deleteBlog, rib
*/

const BlogsList = ({ deleteBlog, rib, authId, blogs }) => {
  const ribButton = (blogUser, blogId) => {
    if (authId !== blogUser) {
      return <button className= "white btn-flat" onClick={() => rib(blogId)}>RIBBIT</button>
    }
  }
  const deleteButton = (blogUser, blogId) => {
    if (authId === blogUser)
      return <button className= "red btn-flat white-text" onClick={() => deleteBlog(blogId)}>Delete</button>
  }

  const renderBlogs = () => {
    //console.log(this.props.auth)
    switch (authId) {
      case null:
        return <div>Checking credentials...</div>
      default:
        return _.map(
          blogs,
          ({ _id, title, body, _userDisplayName, dateSent, ribs, _user }) => (
            <div key={_id} className="card blue-grey darken-1 yellow-text">
              <div className="card-content">
                <Link
                  to={{
                    pathname: `/blogs/${_id}`
                  }}
                >
                  <span className="card-title">{title}</span>
                </Link>
                <p>{body}</p>

                <p className="left">
                  By: <Link to={`/users/${_user}`}>{_userDisplayName}</Link>
                </p>

                <p className="right">
                  Sent on: {new Date(dateSent).toLocaleDateString()}
                </p>
              </div>
              <div className="card-action">
                <a>Ribs: {ribs}</a>
                <Link to={{ pathname: `/blogs/${_id}` }}>Leave A Comment</Link>
                {ribButton(_user, _id)}
                {deleteButton(_user, _id)}
              </div>
            </div>
          )
        )
    }
    // console.log("state after fetchBlogs: ", store.getState())
  }

  //console.log("BlogList's props: ", this.props)
  return <div>{renderBlogs()}</div>
}

const mapStateToProps = ({ auth }) => ({
  auth
})

export default connect(mapStateToProps)(BlogsList)
