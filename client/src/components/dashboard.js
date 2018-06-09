import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import BlogList from "./timeline/BlogList"
import { fetchOwnFollow, fetchBlogs, rib, deleteBlog } from "../actions/index"
import UserFollowingList from "./users/UserFollowingList"
import UserFollowersList from "./users/UserFollowersList"
import AddBlogButton from "./buttons/addBlogButton"

export class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchBlogs()
    this.props.fetchOwnFollow()
  }

  render() {
    switch (this.props.auth) {
      case null:
        return <div> Checking... </div>
      case false:
        return <div>Login with google!</div>
      default:
        return (
          <div>
            <BlogList
              rib={this.props.rib}
              deleteBlog={this.props.deleteBlog}
              blogs={this.props.ownBlogs}
              authId={this.props.auth._id}
            />
            <UserFollowingList following={this.props.following} />
            <UserFollowersList followers={this.props.followers} />
            <AddBlogButton />
          </div>
        )
    }
  }
}
const mapStateToProps = ({ ownFollowing, ownFollowers, auth, ownBlogs }) => ({
  following: ownFollowing,
  followers: ownFollowers,
  ownBlogs,
  auth
})
export default connect(mapStateToProps, {
  fetchOwnFollow,
  fetchBlogs,
  rib,
  deleteBlog
})(Dashboard)
