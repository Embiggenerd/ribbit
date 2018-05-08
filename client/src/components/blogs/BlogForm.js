import _ from "lodash"
import React, { Component } from "react"
import { reduxForm, Field } from "redux-form"
import { Link } from "react-router-dom"
import validateEmails from "../../utils/validateEmails"
import formFields from "./formFields"
import BlogField from "./BlogField"

class BlogForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name, id, textArea }) => {
      return (
        <Field
          textArea={textArea}
          id={id}
          key={name}
          component={BlogField}
          type="text"
          label={label}
          name={name}
        />
      )
    })
  }

  render() {
    return (
      <div className="row">
        <form id="blogForm" className="col s12"onSubmit={this.props.handleSubmit(this.props.onBlogSubmit)}>
          {this.renderFields()}
          <Link to="/" className="red btn-flat left white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    )
  }
}

function validate(values) {
  const errors = {}

  if (!values.title) {
    errors.title = "Required!"
  }
  if (!values.body) {
    errors.body = "Required!"
  }
  return errors
}

export default reduxForm({
  validate,
  form: "blogForm",
  destroyOnUnmount: false
})(BlogForm)
