import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addComment } from '../../actions/post';

const CommentForm = ({ auth, postId, addComment }) => {
  const [text, setText] = useState('');

  const setArea = () => {
    var tx = document.getElementsByTagName('textarea');
    for (var i = 0; i < tx.length; i++) {
      tx[i].setAttribute(
        'style',
        'height:' + tx[i].scrollHeight + 'px;overflow-y:hidden;'
      );
    }
  };

  return (
    <div className='comment-form'>
      <form
        className='form'
        onSubmit={e => {
          e.preventDefault();
          //   text is object
          addComment(postId, { text });
          setText('');
        }}
      >
        {!auth.loading && auth.isAuthenticated ? (
          <Fragment>
            <img className='avatar' src={auth.user.avatar} alt='user-avatar' />
            <textarea
              className='comment-area-responsive'
              name='title'
              rows='1'
              placeholder='What do you think?'
              value={text}
              onChange={e => {
                setText(e.target.value);
                setArea(e.target.value);
              }}
              required
            />
            <input type='submit' className='btn btn-primary' value='Comment' />
          </Fragment>
        ) : (
          <Fragment>
            <p>
              Please <Link to='/login'>log in</Link> to comment
            </p>
          </Fragment>
        )}
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm);
