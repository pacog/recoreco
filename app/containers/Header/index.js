import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import { getLoggedInUser } from '../../store';
import { logoutFromDatabase } from '../../actions';

const Header = ({ user, title, logoutClicked, iconElementLeft, onLeftIconButtonTouchTap, onTitleTouchTap }) => {
  return (
    <div>
      <AppBar
        title={title}
        iconElementLeft={iconElementLeft}
        onLeftIconButtonTouchTap={onLeftIconButtonTouchTap}
        onTitleTouchTap={onTitleTouchTap}
        showMenuIconButton={!!iconElementLeft}
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
  title: React.PropTypes.string.isRequired,
  iconElementLeft: React.PropTypes.node,
  onLeftIconButtonTouchTap: React.PropTypes.func,
  onTitleTouchTap: React.PropTypes.func,
};

const mapStateToProps = (state, ownProps) => ({
    user: getLoggedInUser(state),
    title: ownProps.title,
    iconElementLeft: ownProps.iconElementLeft,
    onLeftIconButtonTouchTap: ownProps.onLeftIconButtonTouchTap,
    onTitleTouchTap: ownProps.onTitleTouchTap,
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
