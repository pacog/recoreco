import React from 'react';
import { getUnseenRecos } from '../../store';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import Footer from '../../components/Footer';
import RecoList from '../../components/RecoList';
import { Card, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const Dashboard = ({ recos }) => {
  return (
    <div>
      <AppBar
        title={'To watch'}
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
      <Footer active={'toWatch'} />
    </div>
  );
};

const mapStateToProps = (state) => ({
    recos: getUnseenRecos(state)
});

const DashboardContainer = connect(mapStateToProps)(Dashboard);

export default DashboardContainer;
