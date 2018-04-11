import { connect } from "react-redux"
import React, { Component } from "react"
import { Link } from "react-router-dom"
import { reduxForm, Field } from "redux-form"
import { fetchBlogDetail, fetchComments } from "../../actions"
import CommentForm from './CommentForm'
import CommentsList from './CommentsList'

class BlogDetailContainer extends Component {

  componentDidMount() {
      this.props.fetchComments(this.props.match.params._id)
      this.props.fetchBlogDetail(this.props.match.params._id)
  }
  renderDetail() {

    const { title, subject, body, dateSent, neg } = this.props.blogDetail
    return (
      <div>
        <div className="card blue-grey darken-1 yellow-text">
          <div className="card-content">
            <span className="card-title">{title}</span>
            <p>{body}</p>
            <p className="right">
              Posted on: {new Date(dateSent).toLocaleDateString()}
            </p>

          </div>
          <div className="card-action">
            <a>Ribs: {neg}</a>
            <a className="right">
              Subjects: {subject}
            </a>
          </div>
        </div>
      </div>
    )
  }

  render() {
    console.log("BlogDetailContainer's params.blogId: ", this.props.match.params)
    return <div style={{ display: "flex", flexDirection: "column"}}>
        {this.renderDetail()}
        <CommentForm
          blogId={this.props.match.params._id}
        />
        <CommentsList
          commentsList={this.props.commentsList}
        />
      </div>
  }
}

const mapStateToProps = ({ blogDetail, commentsList, blogs}) => ({
  blogDetail,
  commentsList,
  blogs,
})
export default connect(mapStateToProps, { fetchBlogDetail, fetchComments })(BlogDetailContainer)
