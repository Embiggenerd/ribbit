import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchBlogs, deleteBlog } from "../../actions"
import { Link } from "react-router-dom"
import store from "../../index"
import _ from "lodash"

/*
Simply fetches our current list of blogs by user from DB
*/
class BlogsList extends Component {
  componentDidMount() {
    this.props.fetchBlogs()
  }
  deleteButton(blogUser, blogId){
    if (this.props.auth._id === blogUser)
    return <button onClick={()=>this.props.deleteBlog(blogId)}>Delete</button>
  }

  renderBlogs() {
    switch(this.props.auth){
      case null:
        return <div>Checking credentials...</div>
      default:
        return _.map(this.props.blogs, blog => (
          <div key={blog._id} className="card blue-grey darken-1 yellow-text">
            <div className="card-content">
              <Link
                to={{
                  pathname: `/blogs/${blog._id}`
                }}
              >
                <span className="card-title">{blog.title}</span>
              </Link>
              <p>{blog.body}</p>
              <p className="right">
                Sent on: {new Date(blog.dateSent).toLocaleDateString()}
              </p>
            </div>
            <div className="card-action">
              <a>Ribs: {blog.neg}</a>
              <Link to={{pathname: `/blogs/${blog._id}`}}>Leave A Comment</Link>
              {this.deleteButton(blog._user, blog._id)}
            </div>
          </div>
        )
      )
    }
    // console.log("state after fetchBlogs: ", store.getState())

  }
  render() {
    return <div>{this.renderBlogs()}</div>
  }
}

const mapStateToProps = ({ blogs, auth }) => ({
  blogs,
  auth
})

export default connect(mapStateToProps, { fetchBlogs, deleteBlog })(BlogsList)
