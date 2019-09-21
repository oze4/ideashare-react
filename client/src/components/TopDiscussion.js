import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const TopDiscussion = ({ posts }) => {
  return (
    <Fragment>
      <h2>Top Discussions</h2>
      <div className='top-discussion-section'>
        {posts
          .sort((a, b) =>
            a.comments.length > b.comments.length
              ? -1
              : b.comments.length > a.comments.length
              ? 1
              : 0
          )
          .slice(0, 10)
          .map(post => (
            <div className={`item ${post.status}-border`}>
              <Link to={`/posts/${post._id}`}>{post.title}</Link>

              <div className='stats'>
                <div className='comments'>
                  <i className='fas fa-comments' />
                  {post.comments.length}
                </div>
                <div className='likes'>
                  <i class='fas fa-caret-up'></i>
                  {post.likes.length}
                </div>
              </div>
            </div>
          ))}
      </div>
    </Fragment>
  );
};

TopDiscussion.propTypes = {
  post: PropTypes.object.isRequired
};

export default TopDiscussion;
