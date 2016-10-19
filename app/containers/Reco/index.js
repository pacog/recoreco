import React from 'react';
import { connect } from 'react-redux';
import { getReco } from '../../reducer';
import { browserHistory } from 'react-router';

// import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';

import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

const Reco = ({ reco }) => {
  return (
    <div>
      <AppBar
        title={'RecoReco'}
        showMenuIconButton={false}
        onTitleTouchTap={() => {
          browserHistory.push('/');
        }} />
      <Card>
        <CardText>
          <h3>
              {reco.name}
          </h3>
          { getRecommendedByPart(reco) }
        </CardText>
      </Card>
    </div>
  );
};

const getRecommendedByPart = (reco) => {
  if(reco.recommender) {
    return (
      <div>
        <p>Recommended by:</p>
        <p>{reco.recommender}</p>
      </div>
    );
  } else {
    return '';
  }

};

const mapStateToProps = (state, { params }) => {
  return {
    reco: getReco(state, params.recoId)
  };
}

const RecoContainer = connect(mapStateToProps)(Reco);

export default RecoContainer;
