import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';

class PostsNew extends Component {

  dangerClassFor(field) {
    return field.touched && field.invalid ? 'has-danger' : '';
  }

  errorsFor(field) {
    return field.touched ? field.error : '';
  }

  render() {
    const { fields: { title, categories, content }, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.props.createPost)}>
        <h3>Create A New Post</h3>

        <div className={`form-group ${this.dangerClassFor(title)}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title} />
          <div className="text-help">
            { this.errorsFor(title) }
          </div>
        </div>

        <div className={`form-group ${this.dangerClassFor(categories)}`}>
          <label>Categories</label>
          <input type="text" className="form-control" {...categories} />
          <div className="text-help">
            { this.errorsFor(categories) }
          </div>
        </div>

        <div className={`form-group ${this.dangerClassFor(content)}`}>
          <label>Content</label>
          <textarea className="form-control" {...content} />
          <div className="text-help">
            { this.errorsFor(content) }
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Title must not be blank';
  }
  if (!values.categories) {
    errors.categories = 'Categories must not be blank';
  }
  if (!values.content) {
    errors.content = 'Content must not be blank';
  }
  return errors;
}

export default reduxForm({
  form: 'PostsNew',
  fields: ['title', 'categories', 'content'],
  validate
}, null, { createPost })(PostsNew);