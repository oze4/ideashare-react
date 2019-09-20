import React, { useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ post: { post }, addPost, alert, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    body: ''
  });

  const setText = () => {
    // this.setState({ text: val });
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
  alert: state.alert
});
// null because no need state from redux
export default connect(
  mapStateToProps,
  { addPost }
)(withRouter(PostForm));
