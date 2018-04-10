import _ from "lodash"
import React, { Component } from "react"
import { reduxForm, Field } from "redux-form"
import { Link } from "react-router-dom"
//import SurveyField from "./SurveyField"
import validateEmails from "../../utils/validateEmails"
import formFields from './formFields'
import BlogField from './BlogField'

class BlogForm extends Component {

  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
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
    // console.log(this.props)
    return (
      <div >
        <form onSubmit={this.props.handleSubmit(this.props.onBlogSubmit)}>
          {this.renderFields()}
          <Link to="/blogs" className="red btn-flat left white-text">
            Cancel
          </Link>
          <button
            type="submit"

            className="teal btn-flat right white-text">
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
  // Returns emails that are not valid according to imported regex

  if (!values.title) {
    errors.title = "Required!"
  }
  if (!values.body) {
    errors.body = "Required!"
  }
  return errors
}

// function validate(values) {
//   const errors = {};
//
//   errors.emails = validateEmails(values.emails || '');
//
//   _.each(formFields, ({ name }) => {
//     if (!values[name]) {
//       errors[name] = 'You must provide a value';
//     }
//   });
//
//   return errors;
// }
export default reduxForm({
  validate,
  form: "blogForm",
  destroyOnUnmount: false
})(BlogForm)
