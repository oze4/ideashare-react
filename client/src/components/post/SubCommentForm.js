import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addSubComment, removeSubComment } from '../../actions/post';
import { connect } from 'react-redux';

const SubCommentForm = ({ addSubComment, postId, commentId }) => {
  const [text, setSubcomment] = useState('');

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addSubComment(postId, commentId, { text });
          setSubcomment('');
        }}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.preventDefault();
            addSubComment({ text });
            setSubcomment('');
          }
        }}
      >
        <textarea
          name='text'
          rows='1'
          placeholder='leave a comment'
          value={text}
          onChange={e => setSubcomment(e.target.value)}
          required
        />

        <input type='submit' className='btn btn-primary' value='Add' />
      </form>
    </div>
  );
};

SubCommentForm.propTypes = {};

export default connect(
  null,
  { addSubComment }
)(SubCommentForm);
