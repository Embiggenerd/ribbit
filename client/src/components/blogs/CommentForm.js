import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { submitComment } from '../../actions';

let CommentForm = props => {
  const { handleSubmit, submitComment, formz, blogId } = props;
  return (
    <div>
      <p>Leave a comment: </p>
      <form
        onSubmit={handleSubmit(() =>
          submitComment(formz.commentForm.values.text, blogId)
        )}
      >
        <Field
          component="textarea"
          type="text"
          name="text"
          value=""
          validation="required"
        />
        <button type="submit" className="teal btn-flat right white-text">
          Submit
        </button>
      </form>
    </div>
  );
};

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Required!';
  }
  if (!values.body) {
    errors.body = 'Required!';
  }
  return errors;
}

function validate(values) {
  const errors = {};

  if (!values.text) {
    errors.text = 'Required!';
  }
  return errors;
}

CommentForm = reduxForm({
  validate,
  form: 'commentForm'
})(CommentForm);

const mapStateToProps = ({ form }) => ({
  formz: form
});

export default connect(
  mapStateToProps,
  { submitComment }
)(CommentForm);
