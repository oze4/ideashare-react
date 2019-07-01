import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
  const [formData, setFormData] = useState({
    title: '',
    body: ''
  });
  return (
    <div>
      <div className='bg-primary p'>
        <h3>Say Something...</h3>
      </div>

      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addPost(formData);
          setFormData('');
        }}
      >
        <textarea
          name='title'
          cols='30'
          rows='5'
          placeholder='What is the idea, problem you have?'
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          required
        />

        <textarea
          name='body'
          cols='30'
          rows='5'
          placeholder='Tell us more how you come up with that, what is the background'
          value={formData.body}
          onChange={e => setFormData({ ...formData, body: e.target.value })}
          required
        />

        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

// null because no need state from redux
export default connect(
  null,
  { addPost }
)(PostForm);
