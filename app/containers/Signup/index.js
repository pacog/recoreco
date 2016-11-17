import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { Card, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';

const Signup = ({ recos }) => {
  return (
    <div>
      <AppBar
        title={'Signup'}
        showMenuIconButton={false} />
      <Card>
        <CardText>
          Signup
        </CardText>
      </Card>
    </div>
  );
};

const SignupContainer = connect()(Signup);

export default SignupContainer;
