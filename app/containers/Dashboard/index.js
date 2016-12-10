import React from 'react';
import { getUnseenRecos } from '../../core/recos';
import { connect } from 'react-redux';

import Header from '../Header';
import Footer from '../../components/Footer';
import RecoList from '../../components/RecoList';
import { Card, CardText } from 'material-ui/Card';

const Dashboard = ({ recos }) => {
  return (
    <div>
      <Header
        title={'To watch'}
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
