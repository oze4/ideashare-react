import React, { useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ post: { post }, addPost, alert, history, auth }) => {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    type: '',
    tags: ''
  });

  if (!auth.isAuthenticated) {
    return Redirect('/login');
  }

  const setText = () => {
    var tx = document.getElementsByTagName('textarea');
    for (var i = 0; i < tx.length; i++) {
      tx[i].setAttribute(
        'style',
        'height:' + tx[i].scrollHeight + 'px;overflow-y:hidden;'
      );
    }
  };

  return (
    <div className='post-form'>
      <h3>Share you idea</h3>
      <form
        onSubmit={e => {
          e.preventDefault();
          addPost(formData, history);
          setFormData('');
        }}
      >
        <textarea
          name='title'
          rows='1'
          placeholder='What is the idea, problem you have?'
          value={formData.title}
          onChange={e => {
            setFormData({ ...formData, title: e.target.value });
            setText(e.target.value);
          }}
          required
        ></textarea>
        <textarea
          name='body'
          rows='1'
          placeholder='Tell us more how you come up with that, what is the background'
          value={formData.body}
          onChange={e => {
            setFormData({ ...formData, body: e.target.value });
            setText(e.target.value);
          }}
          required
        ></textarea>

        <p className='label'>Post Type</p>
        <select
          name='type'
          value={formData.type}
          onChange={e => setFormData({ ...formData, type: e.target.value })}
        >
          <option value='0'>* Select post type</option>
          <option value='Problem'>Problem</option>
          <option value='Idea'>Idea</option>
          <option value='Question'>Question</option>
          <option value='Else'>Else</option>
        </select>

        <p className='label'>Add Tags</p>
        <select
          name='tags'
          value={formData.tags}
          onChange={e => setFormData({ ...formData, tags: e.target.value })}
        >
          <option value='0'>* Select tags</option>
          <option value='Social Issue'>Social Issue</option>
          <option value='Business Idea'>Business Idea</option>
          <option value='Education'>Education</option>
          <option value='Poverty'>Poverty</option>
          <option value='Food'>Food</option>
          <option value='Healthcare'>Healthcare</option>
          <option value='Education'>Education</option>
          <option value='Energy'>Energy</option>
          <option value='Economy'>Economy</option>
          <option value='Climate Change'>Climate Change</option>
          <option value='Life below water'>Life below water</option>
          <option value='Life on land'>Life on land</option>
          <option value='Peace and Justice'>Peace and Justice</option>
          <option value='Else'>Else</option>
        </select>

        <input type='submit' className='btn btn-primary m-2' value='Submit' />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  alert: state.alert,
  auth: state.auth
});
// null because no need state from redux
export default connect(
  mapStateToProps,
  { addPost }
)(withRouter(PostForm));
