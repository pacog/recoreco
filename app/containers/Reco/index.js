import React from 'react';
import { connect } from 'react-redux';
import { getReco } from '../../core/recos';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

import Header from '../Header';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import { recosActions } from '../../core/recos';
import IconButton from 'material-ui/IconButton';
import KeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import timeSince from '../../utils/time-since';
import RatingSelector from '../../components/RatingSelector';
import Footer from '../../components/Footer';

const buttonStyle = {
  marginTop: 20,
  width: '100%'
};

const Reco = ({reco = {}, onRemoveClick, onMarkAsUnSeenClick, onMarkAsSeenClick, onChangedRating}) => {
  return (
    <div>
      <Header
        title={'RecoReco'}
        iconElementLeft={<IconButton><KeyboardArrowLeft /></IconButton>}
        onLeftIconButtonTouchTap={() => {
          browserHistory.goBack();
        }}
        onTitleTouchTap={() => {
          browserHistory.push('/');
        }}
      />
      <Card>
        <CardText>
          { getTitlePart(reco) }
          { getRecommendedByPart(reco) }
          { getAddedPart(reco) }
          { getSeenPart(reco, onMarkAsUnSeenClick, onMarkAsSeenClick, onChangedRating) }

          <RaisedButton
            label="Delete"
            labelPosition="after"
            style={buttonStyle}
            secondary={true}
            icon={<ActionDelete />}
            onClick={ onRemoveClick.bind(this, reco.id) }
          />

        </CardText>

      </Card>

      <Footer />
    </div>
  );
};

const getTitlePart = (reco = {}) => {
  if(reco.name) {
    return (
      <h3>
        {reco.name}
      </h3>
    );
  } else {
    return '';
  }
}

const getRecommendedByPart = (reco = {}) => {
  if(reco.recommender) {
    return (
      <p>
        <span>Recommended by: </span>
        <Link
          to={`/recommender/${encodeURI(reco.recommender)}`}
        >{reco.recommender}</Link>
      </p>
    );
  } else {
    return '';
  }

};

const getAddedPart = (reco = {}) => {
  if(reco.added) {
    return (
      <div>
        <p>{timeSince(reco.added)} ago</p>
      </div>
    );
  } else {
    return '';
  }

};

const getSeenPart = (reco = {}, onMarkAsUnSeenClick, onMarkAsSeenClick, onChangedRating) => {
  if(reco.seen) {
    return (
      <div>
        <RatingSelector rating={reco.rating} onChangedRating={ onChangedRating.bind(this, reco.id) }></RatingSelector>
        { getMarkAsUnseenPart(reco, onMarkAsUnSeenClick) }
      </div>
    );
  } else {
    return getMarkAsSeenPart(reco, onMarkAsSeenClick);
  }
};

const getMarkAsUnseenPart = (reco, onMarkAsUnSeenClick) => {
  return (
    <RaisedButton
      label="Mark as unseen"
      style={buttonStyle}
      primary={true}
      onClick={ onMarkAsUnSeenClick.bind(this, reco.id) }
    />
  );
};

const getMarkAsSeenPart = (reco, onMarkAsSeenClick) => {
  return (
    <RaisedButton
      label="Mark as seen"
      style={buttonStyle}
      primary={true}
      onClick={ onMarkAsSeenClick.bind(this, reco.id) }
    />
  );
};

const mapStateToProps = (state, { params }) => {
  return {
    reco: getReco(state, params.recoId)
  };
};

const mapDispatchToProps = (dispatch, { params }) => {
  return {
    onRemoveClick: () => {
      dispatch(recosActions.removeReco(params.recoId)).then(() => {
        browserHistory.push('/')
      });
    },
    onMarkAsUnSeenClick: () => {
      dispatch(recosActions.editReco(params.recoId, { seen: false }));
    },
    onMarkAsSeenClick: () => {
      dispatch(recosActions.editReco(params.recoId, { seen: true }));
    },
    onChangedRating: (id, newRating) => {
      dispatch(recosActions.editReco(params.recoId, { rating: newRating }));
    }
  };
};

const RecoContainer = connect(mapStateToProps, mapDispatchToProps)(Reco);

export default RecoContainer;
