import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchUserBlogs, fetchUserComments } from "../../actions"
import UserBlogsList from "./UserBlogsList"
import UserCommentsList from "./UserCommentsList"
import UserFollowersList from "./User/UserFollowersList"

// Displays a user's posts, comments, total reading hours, rank
class UserContainer extends Component {
  componentDidMount() {
    this.props.fetchUserBlogs(this.props.match.params._id)
    this.props.fetchUserComments(this.props.match.params._id)
    this.props.fetchUserFollowers(this.props.match.params._id)
    this.props.fetchUserFollowers(this.props.match.params._id)
  }
  render() {
    console.log("UserContainer's props: ", this.props)
    return (
      <div>
        <UserFollowersList followers={this.prop.follow}>
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
    followers: user.followers
  }
}
export default connect(mapStateToProps, {fetchUserBlogs, fetchUserComments})(UserContainer)
