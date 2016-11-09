import React from 'react';
import { browserHistory } from 'react-router';

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconEye from 'material-ui/svg-icons/image/remove-red-eye';
import IconHistory from 'material-ui/svg-icons/action/history';
import IconAdd from 'material-ui/svg-icons/content/add';

const style = {
  position: 'fixed',
  bottom: 0,
  left: 0
};

const activeIndexes = {
  'toWatch': 0,
  'history': 1,
  'add': 2
};

const Footer = ({active}) => {
  const selectedIndex = activeIndexes[active];
  return (
    <Paper zDepth={1} style={style}>
      <BottomNavigation selectedIndex={selectedIndex}>
        <BottomNavigationItem
          label="To watch"
          icon={<IconEye />}
          onTouchTap={ () => browserHistory.push('/') }
        />
        <BottomNavigationItem
          label="History"
          icon={<IconHistory />}
          onTouchTap={ () => browserHistory.push('/history') }
        />
        <BottomNavigationItem
          label="Add"
          icon={<IconAdd />}
          onTouchTap={ () => browserHistory.push('/add') }
        />
      </BottomNavigation>
    </Paper>
  );
};

Footer.propTypes = {
  active: React.PropTypes.oneOf(['toWatch','history', 'add'])
};

export default Footer;
