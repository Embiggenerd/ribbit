import { connect } from "react-redux"
import React, { Component } from "react"
import { Link } from "react-router-dom"
import { reduxForm, Field } from "redux-form"
import {
  fetchBlogDetail,
  fetchComments,
  deleteComment,
  deleteBlog,
  rib
} from "../../actions"
import { updateReadingHours } from "../../actions/apiCalls"
import CommentForm from "./CommentForm"
import CommentsList from "./CommentsList"
import scrollToElement from "scroll-to-element"
import ribButton from "../buttons/ribButton"
import { withRouter } from 'react-router-dom'


class BlogDetailContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeMounted: 0
    }
    this.calcReadingHours = timeUnmounted => {
      // Simply reports time of time unmounting - mounting to backand api
      // with the author's id
      const timeDiff = Math.abs(
        (timeUnmounted - this.state.timeMounted) / (1000 * 60 * 60)
      )
      updateReadingHours(timeDiff, this.props.blogDetail._user)
    }
  }

  ribButton(blogUser, blogId) {
    if (this.props.auth._id !== blogUser)
      return <button onClick={() => this.props.rib(blogId)}>RIBBIT</button>
  }

  deleteButton(blogUser, blogId, history) {
    if (this.props.auth._id === blogUser)
      return (
        <button onClick={() => this.props.deleteBlog(blogId, history)}>Delete</button>
      )
  }
  componentDidMount() {
    this.setState({
      timeMounted: new Date()
    })
    this.props.fetchComments(this.props.match.params._id)
    this.props.fetchBlogDetail(this.props.match.params._id)
  }
  componentDidUpdate() {
    this.jumpToHash()
  }
  componentWillUnmount() {
    const timeNow = new Date()
    this.calcReadingHours(timeNow)
  }
  jumpToHash = () => {
    const hash = this.props.history.location.hash
    if (hash) scrollToElement(hash, { offset: -30 })
  }
  renderDetail() {
    switch (this.props.auth) {
      case null:
        return <div>Checking...</div>
      default:
        const {
          title,
          body,
          dateSent,
          ribs,
          _userDisplayName,
          _user,
          _id
        } = this.props.blogDetail
        const { history } = this.props
        return (
          <div>
            <div className="card blue-grey darken-1 yellow-text">
              <div className="card-content">
                <span className="card-title">{title}</span>
                <p>{body}</p>
                <p className="left">
                  By: <Link to={`/users/${_user}`}>{_userDisplayName}</Link>
                </p>
                <p className="right">
                  Posted on: {new Date(dateSent).toLocaleDateString()}
                </p>
              </div>
              <div className="card-action">
                <a>Ribs: {ribs}</a>
                {this.ribButton(_user, _id)}
                {this.deleteButton(_user, _id, history)}
              </div>
            </div>
          </div>
        )
    }
  }

  render() {
    console.log("BlogDetailContainer's props object ", this.props)
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {this.renderDetail()}
        <CommentForm blogId={this.props.match.params._id} />
        <CommentsList
          auth={this.props.auth}
          blog_user={this.props.blogDetail._user}
          deleteComment={this.props.deleteComment}
          commentsList={this.props.commentsList}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ blogDetail, commentsList, auth }) => ({
  blogDetail,
  commentsList,
  auth
})
export default connect(mapStateToProps, {
  fetchBlogDetail,
  fetchComments,
  deleteComment,
  deleteBlog,
  rib
})(withRouter(BlogDetailContainer))
