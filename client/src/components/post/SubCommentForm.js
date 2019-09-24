import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addSubComment } from '../../actions/post';
import { connect } from 'react-redux';

const SubCommentForm = ({ addSubComment, postId, commentId }) => {
  const [text, setSubcomment] = useState('');
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
          onChange={e => {
            setSubcomment(e.target.value);
            setArea(e.target.value);
          }}
          required
        />

        <input type='submit' className='btn btn-primary' value='Add' />
      </form>
    </div>
  );
};

SubCommentForm.propTypes = {
  addSubComment: PropTypes.func.isRequired
};

export default connect(
  null,
  { addSubComment }
)(SubCommentForm);
