import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchUserBlogs, fetchUserComments } from "../../actions"
import UserBlogsList from "./UserBlogsList"
import UserCommentsList from "./UserCommentsList"

// Displays a user's posts, comments, total reading hours, rank
class UserContainer extends Component {
  componentDidMount() {
    this.props.fetchUserBlogs(this.props.match.params._id)
    this.props.fetchUserComments(this.props.match.params._id)
  }
  render() {
    console.log("UserContainer's props: ", this.props)
    return (
      <div>
        <UserBlogsList blogs={this.props.blogs} />
        <UserCommentsList comments={this.props.commentsList} />
      </div>
    )
  }
  // fetch user's statistics


}

const mapStateToProps = ({ blogs, commentsList }) => {
  return {
    blogs,
    commentsList
  }
}
export default connect(mapStateToProps, {fetchUserBlogs, fetchUserComments})(UserContainer)
