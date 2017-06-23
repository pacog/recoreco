import React from 'react';
import { getSeenRecos } from '../../core/recos';
import { isLoading } from '../../core/loading';

import { connect } from 'react-redux';

import Header from '../Header';
import Footer from '../../components/Footer';
import RecoList from '../../components/RecoList';
import LoadingIndicator from '../../components/LoadingIndicator';
import { Card, CardText } from 'material-ui/Card';

const History = ({ recos, isLoading }) => {
  return (
    <div>
      <Header
        title={'History'}
        />
        { getContentPart(recos, isLoading) }
      <Footer active={'history'} />
    </div>
  );
};

const mapStateToProps = (state) => ({
    recos: getSeenRecos(state),
    isLoading: isLoading(state)
});

const getContentPart = (recos, isLoading) => {
  if(isLoading) {
    return <LoadingIndicator />
  } else {
    return (
      <Card>
        <CardText>
          <RecoList recos={recos} />
        </CardText>
      </Card>
    );
  }
}

const HistoryContainer = connect(mapStateToProps)(History);

export default HistoryContainer;
