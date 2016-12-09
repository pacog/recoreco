import React from 'react';
import { getSeenRecos } from '../../store';
import { connect } from 'react-redux';

import Header from '../Header';
import Footer from '../../components/Footer';
import RecoList from '../../components/RecoList';
import { Card, CardText } from 'material-ui/Card';

const History = ({ recos }) => {
  return (
    <div>
      <Header
        title={'History'}
        />
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
