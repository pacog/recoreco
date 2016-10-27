import React from 'react';
import { connect } from 'react-redux';
import AddReco from '../AddReco';
import RecoList from '../../components/RecoList';
import { Card, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { browserHistory } from 'react-router';
import FloatingAddButton from '../../components/FloatingAddButton';
import { getRecosByRecommender } from '../../reducer';

const Recommender = ({ params, recos }) => {
  return (
    <div>
      <AppBar
        title={`Recos by ${decodeURI(params.recommender)}`}
        showMenuIconButton={false}
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
      <FloatingAddButton />
    </div>
  );
};

const mapStateToProps = (state, { params }) => ({
    recos: getRecosByRecommender(state, decodeURI(params.recommender ))
});
const RecommenderContainer = connect(mapStateToProps)(Recommender);
export default RecommenderContainer;
