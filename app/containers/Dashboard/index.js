import React from 'react';

import { recosActions, getUnseenRecos } from '../../core/recos';
import { isLoading } from '../../core/loading';
import { connect } from 'react-redux';

import Header from '../Header';
import Footer from '../../components/Footer';
import RecoList from '../../components/RecoList';
import LoadingIndicator from '../../components/LoadingIndicator';
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
            { getContentPart(this.props.recos, this.props.isLoading) }
          </CardText>
        </Card>
        <Footer active={'toWatch'} />
      </div>
    );
  }
};

const getContentPart = (recos, loading) => {
  if(loading) {
    return <LoadingIndicator />;
  } else {
    return <RecoList recos={recos} />;
  }

}

const mapStateToProps = (state) => ({
    recos: getUnseenRecos(state),
    isLoading: isLoading(state)
});

const mapDispatchToProps = Object.assign(
  {},
  recosActions
);

const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default DashboardContainer;
