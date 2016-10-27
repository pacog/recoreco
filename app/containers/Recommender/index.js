import React from 'react';
import AddReco from '../AddReco';
// import RecoList from '../RecoList';
import { Card, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { browserHistory } from 'react-router';
import FloatingAddButton from '../../components/FloatingAddButton';

const Recommender = ({ params }) => {
  return (
    <div>
      <AppBar
        title={`Recos by ${decodeURI(params.recommender)}`}
        showMenuIconButton={false}
        iconElementRight={<FlatButton label="Add" />}
        onRightIconButtonTouchTap={
          () => {
            browserHistory.push('/add');
          }
        }/>
      <Card>
        <CardText>

        </CardText>
      </Card>
      <FloatingAddButton />
    </div>
  );
};

export default Recommender;
