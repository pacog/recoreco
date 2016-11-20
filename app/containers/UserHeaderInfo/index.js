import React from 'react';
import { connect } from 'react-redux';

const UserHeaderInfo = ({ user }) => {
  if(user) {
    return (
      <div>{user.username}</div>
    );
  } else {
    return (
      <div></div>
    );
  }
};

const mapStateToProps = (state) => ({
    user: state.auth.loggedInUser
});
const UserHeaderInfoContainer = connect(mapStateToProps)(UserHeaderInfo);
export default UserHeaderInfoContainer;
