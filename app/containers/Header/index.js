import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import { getLoggedInUser } from '../../store';
import { logoutFromDatabase } from '../../actions';

const Header = ({ user, title, logoutClicked }) => {

  return (
    <div>
      <AppBar
        title={title}
        showMenuIconButton={false}
        iconElementRight={(
          <IconMenu
            iconButtonElement={
              <IconButton><MoreVertIcon /></IconButton>
            }
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem primaryText={user.email} />
            <MenuItem primaryText='Log out'
                onClick={logoutClicked}/>
          </IconMenu>
        )}
        />
    </div>
  );
};

Header.propTypes = {
  title: React.PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => ({
    user: getLoggedInUser(state),
    title: ownProps.title
});
const mapDispatchToProps = (dispatch) => {
  return {
    logoutClicked: () => {
      dispatch(logoutFromDatabase()).then(() => {
        browserHistory.push('/login');
      });
    }
  };
};
const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);

export default HeaderContainer;
