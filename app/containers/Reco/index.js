import React from 'react';
import { connect } from 'react-redux';
import { getReco } from '../../reducer';
import { browserHistory } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import { removeReco } from '../../actions';
import IconButton from 'material-ui/IconButton';
import KeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

const deleteButtonStyle = {
  marginTop: 20,
  width: '100%'
};

const Reco = ({reco, onRemoveClick}) => {
  return (
    <div>
      <AppBar
        title={'RecoReco'}
        iconElementLeft={<IconButton><KeyboardArrowLeft /></IconButton>}
        onLeftIconButtonTouchTap={() => {
          browserHistory.push('/');
        }}
        onTitleTouchTap={() => {
          browserHistory.push('/');
        }} />
      <Card>
        <CardText>
          <h3>
              {reco.name}
          </h3>
          { getRecommendedByPart(reco) }
          { getAddedPart(reco) }
          <RaisedButton
            label="Delete"
            labelPosition="after"
            style={deleteButtonStyle}
            primary={true}
            icon={<ActionDelete />}
            onClick={ onRemoveClick.bind(this, reco.id) }
          />
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

const getAddedPart = (reco) => {
  if(reco.added) {
    return (
      <div>
        <p>Added:</p>
        <p>{reco.added}</p>
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
};

const mapDispatchToProps = (dispatch, { params }) => {
  return {
    onRemoveClick: (id) => {
      dispatch(removeReco(params.recoId));
      browserHistory.push('/');
    }
  };
};


const RecoContainer = connect(mapStateToProps, mapDispatchToProps)(Reco);

export default RecoContainer;
