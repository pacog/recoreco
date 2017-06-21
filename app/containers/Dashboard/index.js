import React from 'react';

import { recosActions, getUnseenRecos } from '../../core/recos';
import { connect } from 'react-redux';

import Header from '../Header';
import Footer from '../../components/Footer';
import RecoList from '../../components/RecoList';
import { Card, CardText } from 'material-ui/Card';

export class Dashboard extends React.Component {

  render() {
    return (
      <div>
        <Header
          title={'To watch'}
          />
        <Card>
          <CardText>
            <RecoList recos={this.props.recos} />
          </CardText>
        </Card>
        <Footer active={'toWatch'} />
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
    recos: getUnseenRecos(state)
});

const mapDispatchToProps = Object.assign(
  {},
  recosActions
);

const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default DashboardContainer;
