import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import UserItem from '../users/UserItem';
import TopDiscussion from '../TopDiscussion';
import SmallAbout from '../SmallAbout';
import { getPosts, getTodayPosts } from '../../actions/post';
import Moment from 'react-moment';
import Today from '../post/Today';
import InfiniteScroll from 'react-infinite-scroller';

const constants = {
  POSTS_CHUNK: 5,
  LOADING_STYLE: {
    textAlign: "center",
    fontSize: "48px",
    color: "red"
  },
  POSTS_CONTAINER_STYLE: {
    maxHeight: '50vh',
    overflowY: 'scroll'
  }
}

const Posts = ({ getPosts, getTodayPosts, post: { posts, loading } }) => {
  const [shownPosts, setShownPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  useEffect(() => {
    let sp = posts.slice(0, constants.POSTS_CHUNK);
    setShownPosts(sp);
  }, [posts])

  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const loadMorePosts = () => {
    let items = shownPosts && posts.slice(0, shownPosts.length + constants.POSTS_CHUNK);
    setShownPosts(items);
  }

  return loading ? (
    <Spinner />
  ) : (
      <div className='main-grid'>
        <div className='posts-grid'>
          <h1 className='large text-primary'>Ideas</h1>
          <div className='posts'>
            {/* <h1>Today</h1>
          <h1>{startOfToday}</h1>
          <Moment format='YYYY/MM/DD'>{startOfToday}</Moment>
          {startOfToday < posts[0].date && <h1>true!</h1>}
          <h1>{posts[0].title}</h1>
          <Moment format='YYYY/MM/DD'>{posts[0].date}</Moment> */}
            <div style={constants.POSTS_CONTAINER_STYLE}>
              <InfiniteScroll
                pageStart={0}
                loadMore={loadMorePosts}
                hasMore={posts.length > shownPosts.length}
                loader={<div style={constants.LOADING_STYLE}>Loading...</div>}
                useWindow={false}
              >
                {shownPosts && shownPosts
                  .filter(post => post.date < startOfToday)
                  .map(post => (
                    <h1>hi</h1>
                  ))}
                {shownPosts && shownPosts
                  .sort((a, b) =>
                    a.likes.length > b.likes.length
                      ? -1
                      : b.likes.length > a.likes.length
                        ? 1
                        : 0
                  )
                  .map(post => (
                    <PostItem key={post._id} post={post} />
                  ))}
              </InfiniteScroll>
            </div>
          </div>
        </div>
        <div className='right-panel-grid'>
          <SmallAbout />
          <UserItem />
          <TopDiscussion posts={posts} />
          <div
            className='fb-group'
            data-href='https://www.facebook.com/groups/ideatoshare/'
            data-width='350'
            data-show-social-context='true'
            data-show-metadata='false'
          ></div>

          <iframe
            title='producthunt'
            style={{ border: 'none' }}
            src='https://cards.producthunt.com/cards/posts/168618?v=1'
            width='350'
            height='405'
            frameborder='0'
            scrolling='no'
            allowfullscreen
          ></iframe>
        </div>
      </div>
    );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  getTodayPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});
export default connect(
  mapStateToProps,
  { getPosts, getTodayPosts }
)(Posts);
