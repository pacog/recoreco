import React from 'react';

import Header from '../Header';
import RecommendersList from '../RecommendersList';
import { Card, CardText } from 'material-ui/Card';
import Footer from '../../components/Footer';

const Recommenders = () => {
  return (
    <div>
      <Header
        title={'RecoRecommenders'}
        />
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
