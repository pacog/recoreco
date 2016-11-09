import React from 'react';
import AddReco from '../AddReco';
import RecommendersList from '../RecommendersList';
import { Card, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { browserHistory } from 'react-router';
import Footer from '../../components/Footer';

const Recommenders = () => {
  return (
    <div>
      <AppBar
        title={'RecoRecommenders'}
        showMenuIconButton={false}
        iconElementRight={<FlatButton label="Add" />}
        onRightIconButtonTouchTap={
          () => {
            browserHistory.push('/add');
          }
        }/>
      <Card>
        <CardText>
          <RecommendersList />
        </CardText>
      </Card>
      <Footer />
    </div>
  );
};

export default Recommenders;
