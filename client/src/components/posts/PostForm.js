import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ post: { post }, addPost, alert }) => {
  const [formData, setFormData] = useState({
    title: '',
    body: ''
  });
  return (
    <div className='post-form'>
      <h3>Share you idea</h3>
      <form
        onSubmit={e => {
          e.preventDefault();
          addPost(formData);
          setFormData('');
        }}
      >
        <textarea
          name='title'
          rows='3'
          placeholder='What is the idea, problem you have?'
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <textarea
          name='body'
          rows='5'
          placeholder='Tell us more how you come up with that, what is the background'
          value={formData.body}
          onChange={e => setFormData({ ...formData, body: e.target.value })}
          required
        />
        <input type='submit' className='btn btn-primary m-2' value='Submit' />
      </form>

      {alert.length > 0 &&
        alert[0].msg === 'Post Created' &&
        alert[0].alertType === 'success' && (
          <Redirect to={`/posts/${alert[0].id}`} />
        )}
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  alert: state.alert
});
// null because no need state from redux
export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
