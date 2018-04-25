import React, { Component } from "react"
import { connect } from "react-redux"
import {
  fetchUserBlogs,
  fetchUserComments,
  fetchUserFollowers,
  fetchUserFollowing,
  toFollow
} from "../../actions"
import UserBlogsList from "./UserBlogsList"
import UserCommentsList from "./UserCommentsList"
import UserFollowersList from "./UserFollowersList"
import UserFollowingList from "./UserFollowingList"
import FollowUserButton from "./FollowUserButton"

// Displays a user's posts, comments, total reading hours, rank
class UserContainer extends Component {
  componentDidMount() {
    this.props.fetchUserBlogs(this.props.match.params._id)
    this.props.fetchUserComments(this.props.match.params._id)
    this.props.fetchUserFollowers(this.props.match.params._id)
    this.props.fetchUserFollowing(this.props.match.params._id)
  }
  render() {
    console.log("UserContainer's props: ", this.props)
    return (
      <div>
        <FollowUserButton
          _id={this.props.match.params._id}
          onClickHandler={this.props.toFollow}
        />
        <UserFollowersList followers={this.props.followers} />
        <UserFollowingList following={this.props.following} />
        <UserBlogsList blogs={this.props.blogs} />
        <UserCommentsList comments={this.props.commentsList} />
      </div>
    )
  }
}

const mapStateToProps = ({ blogs, commentsList, user }) => {
  return {
    blogs,
    commentsList,
    followers: user.followers,
    following: user.following
  }
}
export default connect(mapStateToProps, {
  fetchUserBlogs,
  fetchUserComments,
  fetchUserFollowers,
  fetchUserFollowing,
  toFollow
})(UserContainer)
