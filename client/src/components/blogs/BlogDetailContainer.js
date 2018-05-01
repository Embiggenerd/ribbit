import { connect } from "react-redux"
import React, { Component } from "react"
import { Link } from "react-router-dom"
import { reduxForm, Field } from "redux-form"
import { fetchBlogDetail, fetchComments, deleteComment } from "../../actions"
import { updateReadingHours } from "../../actions/apiCalls"
import CommentForm from "./CommentForm"
import CommentsList from "./CommentsList"
import scrollToElement from "scroll-to-element"

class BlogDetailContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeMounted: 0
    }
    this.calcReadingHours = timeUnmounted => {
      const timeDiff = Math.abs(
        (timeUnmounted - this.state.timeMounted) / (1000 * 60 * 60)
      )
      updateReadingHours(timeDiff, this.props.blogDetail._user)
    }
  }
  componentDidMount() {
    this.setState({
      timeMounted: new Date()
    })
    this.props.fetchComments(this.props.match.params._id)
    this.props.fetchBlogDetail(this.props.match.params._id)
    console.log(this.props)
    //console.log("history: ",this.props.history)
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
    if (hash) {
      scrollToElement(hash, { offset: -30 })
    }
  }
  renderDetail() {
    const {
      title,
      subject,
      body,
      dateSent,
      neg,
      _userDisplayName,
      _user
    } = this.props.blogDetail
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
            <a>Ribs: {neg}</a>
            <a className="right">Subjects: {subject}</a>
          </div>
        </div>
      </div>
    )
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
  deleteComment
})(BlogDetailContainer)
