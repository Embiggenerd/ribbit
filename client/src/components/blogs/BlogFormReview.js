import React from 'react'
import { connect } from 'react-redux'
import formFields from './formFields'
import _ from 'lodash'
import { submitBlog } from '../../actions'
import { withRouter } from 'react-router-dom'
import Error from "../error"

/*
* This component passes history prop to submitBlog action for navigation
*/

const BlogFormReview = (props) => {
  const {onCancel, formValues, submitBlog, history} = props

  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>
          {formValues[name]}
        </div>
      </div>
    )
  })

  
  return (
    <div>
      <h5>Confirm</h5>
        {reviewFields}
      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        onClick={() => submitBlog(formValues, history)}
        className="green btn-flat right white-text">
        Post Blog
        <i className="material-icons right">email</i>
      </button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { formValues: state.form.blogForm.values }
}

export default connect(mapStateToProps, { submitBlog})(withRouter(BlogFormReview))
