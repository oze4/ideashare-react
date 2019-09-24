import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getNotification, seeNotification } from '../../actions/notification';

const NotificationIcon = ({
  notification,
  getNotification,
  seeNotification
}) => {
  useEffect(() => {
    getNotification();
  }, [getNotification]);
  return (
    <div>
      {notification.seen ? (
        <Link to='/dashboard'>
          <i className='far fa-bell font-size-1 mx-1'></i>
        </Link>
      ) : (
        <button onClick={e => seeNotification()}>
          <Link to='/dashboard'>
            <i className='fas fa-bell text-primary font-size-1 mx-1'></i>
          </Link>
        </button>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  notification: state.notification
});
export default connect(
  mapStateToProps,
  { getNotification, seeNotification }
)(NotificationIcon);
