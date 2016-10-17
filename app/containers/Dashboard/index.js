import React from 'react';
import AddReco from '../AddReco';
import RecoList from '../RecoList';
import { Card, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';

const RecoReco = () => {
  return (
    <div>
      <AppBar
        title={'RecoReco'}
        showMenuIconButton={false}/>
      <Card>
        <CardText>
          <RecoList />
        </CardText>
      </Card>
    </div>
  );
};

export default RecoReco;
