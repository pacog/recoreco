import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getRecosByRecommender } from '../../reducer';
import AddReco from '../AddReco';
import RecoList from '../../components/RecoList';
import { Card, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import KeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import Footer from '../../components/Footer';

const Recommender = ({ params, recos }) => {
  return (
    <div>
      <AppBar
        title={`Recos by ${decodeURI(params.recommender)}`}
        iconElementLeft={<IconButton><KeyboardArrowLeft /></IconButton>}
        onLeftIconButtonTouchTap={() => {
          browserHistory.goBack();
        }}
        iconElementRight={<FlatButton label="See all" />}
        onRightIconButtonTouchTap={
          () => {
            browserHistory.push('/');
          }
        }/>
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
