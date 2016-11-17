import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { Card, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';

const Login = ({ recos }) => {
  return (
    <div>
      <AppBar
        title={'Login'}
        showMenuIconButton={false} />
      <Card>
        <CardText>
          Login
        </CardText>
      </Card>
    </div>
  );
};

const LoginContainer = connect()(Login);

export default LoginContainer;
