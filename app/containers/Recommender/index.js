import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getRecosByRecommender } from '../../store';


import Header from '../Header';
import RecoList from '../../components/RecoList';
import Footer from '../../components/Footer';
import { Card, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import KeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';


const Recommender = ({ params, recos }) => {
  return (
    <div>
      <Header
        title={`Recos by ${decodeURI(params.recommender)}`}
        iconElementLeft={<IconButton><KeyboardArrowLeft /></IconButton>}
        onLeftIconButtonTouchTap={() => {
          browserHistory.goBack();
        }}
        />
      <Card>
        <CardText>
          <RecoList recos={recos} />
        </CardText>
      </Card>

      <Footer />
    </div>
  );
};

const mapStateToProps = (state, { params }) => ({
    recos: getRecosByRecommender(state, decodeURI(params.recommender ))
});
const RecommenderContainer = connect(mapStateToProps)(Recommender);
export default RecommenderContainer;
