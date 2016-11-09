import React from 'react';
import { getSeenRecos } from '../../reducer';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import Footer from '../../components/Footer';
import RecoList from '../../components/RecoList';
import { Card, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const History = ({ recos }) => {
  return (
    <div>
      <AppBar
        title={'History'}
        showMenuIconButton={false}
        iconElementRight={<FlatButton label="Add" />}
        onRightIconButtonTouchTap={
          () => {
            browserHistory.push('/add');
          }
        }/>
      <Card>
        <CardText>
          <RecoList recos={recos} />
        </CardText>
      </Card>
      <Footer active={'history'} />
    </div>
  );
};

const mapStateToProps = (state) => ({
    recos: getSeenRecos(state)
});

const HistoryContainer = connect(mapStateToProps)(History);

export default HistoryContainer;
