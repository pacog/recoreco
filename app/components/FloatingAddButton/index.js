import React from 'react';
import { Link } from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const style = {
  position: 'fixed',
  bottom: 40,
  right: 40
};

const FloatingAddButton = () => {
  return (
    <Link to={'/add'} style={style}>
      <FloatingActionButton secondary={true} >
        <ContentAdd />
      </FloatingActionButton>
    </Link>
  );
};

export default FloatingAddButton;
