import React from 'react';
import { getUnseenRecos } from '../../store';
import { connect } from 'react-redux';

import Footer from '../../components/Footer';
import RecoList from '../../components/RecoList';
import UserHeaderInfo from '../UserHeaderInfo';
import { Card, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';

const Dashboard = ({ recos }) => {
  return (
    <div>
      <AppBar
        title={'To watch'}
        showMenuIconButton={false}
        iconElementRight={<UserHeaderInfo />}
        />
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
