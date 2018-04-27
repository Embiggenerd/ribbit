import React, { Component } from "react"
import { connect } from "react-redux"
import {
  fetchUserBlogs,
  fetchUserComments,
  fetchUserFollowers,
  fetchUserFollowing,
  toFollow,
  toUnfollow
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
    //console.log("UserContainer's props: ", this.props)
    switch (this.props.auth) {
      case null:
        return <div>Checking credentials:</div>
      default:
        return (
          <div>
            <FollowUserButton
              auth={this.props.auth}
              _user={this.props.match.params._id}
              followers={this.props.followers}
              onClickFollowHandler={this.props.toFollow}
              onClickUnfollowHandler={this.props.toUnfollow}
            />
            <UserFollowersList followers={this.props.followers} />
            <UserFollowingList following={this.props.following} />
            <UserBlogsList blogs={this.props.blogs} />
            <UserCommentsList comments={this.props.commentsList} />
          </div>
        )
    }
  }
}

const mapStateToProps = ({ blogs, commentsList, user, auth }) => {
  return {
    blogs,
    commentsList,
    followers: user.followers,
    following: user.following,
    auth
  }
}
export default connect(mapStateToProps, {
  fetchUserBlogs,
  fetchUserComments,
  fetchUserFollowers,
  fetchUserFollowing,
  toFollow,
  toUnfollow
})(UserContainer)
