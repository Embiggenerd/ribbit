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
    //console.log("BlogDetailContainer's _id in path:", this.props.match.params._id)
    let blogDetailSource
    // if(this.props.blogs) {
    //   blogDetailSource = this.props.blogs[this.props.match.params._id]
    // } else {
    //   blogDetailSource = this.props.blogDetail
    // }

    blogDetailSource = this.props.blogDetail

    const { title, subject, body, dateSent, neg } = blogDetailSource
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
    return <div style={{ display: "flex", flexDirection: "column"}}>
        {this.renderDetail()}
        <CommentForm
          blogId={this.props.match.params.blogId}
        />
        <CommentsList
          commentsList={this.props.commentsList}
        />
      </div>
  }
}


// const BlogDetail = (props) => {
//   //const {foo} = props.location.state
//   console.log("detail props: ", props.location.state.foo)
//   return (
//     <div>hi there</div>
//   )
// }

const mapStateToProps = ({ blogDetail, commentsList, blogs}) => ({
  blogDetail,
  commentsList,
  blogs,
})
export default connect(mapStateToProps, { fetchBlogDetail, fetchComments })(BlogDetailContainer)
