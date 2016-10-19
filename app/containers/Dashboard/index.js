import React from 'react';
import AddReco from '../AddReco';
import RecoList from '../RecoList';
import { Card, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { browserHistory } from 'react-router';

const RecoReco = () => {
  return (
    <div>
      <AppBar
        title={'RecoReco'}
        showMenuIconButton={false}
        iconElementRight={<FlatButton label="Add" />}
        onRightIconButtonTouchTap={
          () => {
            browserHistory.push('/add');
          }
        }/>
      <Card>
        <CardText>
          <RecoList />
        </CardText>
      </Card>
    </div>
  );
};

export default RecoReco;
