import React from 'react';
import { connect } from 'react-redux';
import { getReco } from '../../core/recos';
import { isEditing } from '../../core/loading';
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
import LoadingIndicator from '../../components/LoadingIndicator';
import { getCategoryButtonForCategory } from '../../components/CategoryButtons';

const buttonStyle = {
  marginTop: 20,
  width: '100%'
};

const softTextStyle = {
  color: '#676767',
  fontSize: 12
};

const ratingSelectorStyle = {
  textAlign: 'center',
  paddingTop: 20,
  paddingBottom: 20,
};
const containerStyle = {
  position: 'relative'
};

const floatingStyle = {
  position: 'absolute',
  top: 20,
  right: 20
};

const Reco = ({reco = {}, isLoading, onRemoveClick, onMarkAsUnSeenClick, onMarkAsSeenClick, onChangedRating}) => {
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
      <div style={containerStyle}>
        { getContentPart(reco, isLoading, onMarkAsUnSeenClick, onMarkAsSeenClick, onChangedRating, onRemoveClick) }
      </div>
      <Footer />
    </div>
  );
};

const getContentPart = (reco, isLoading, onMarkAsUnSeenClick, onMarkAsSeenClick, onChangedRating, onRemoveClick) => {
  if(isLoading) {
    return <LoadingIndicator />;
  }
  return (
    <Card>
      <CardText>
        { getEditPart(reco) }
        { getTitlePart(reco) }
        { getCategoryPart(reco) }
        { getRecommendedByPart(reco) }
        { getAddedPart(reco) }
        { getSeenPart(reco, onMarkAsUnSeenClick, onMarkAsSeenClick, onChangedRating, onRemoveClick) }

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
  );
};


const getEditPart = (reco = {}) => {
  return (
    <div style={floatingStyle}>
      <Link
        to={`/edit-reco/${reco.key}`}
      >
        <RaisedButton
          backgroundColor='#c3c4c5'
          label={'Edit'}/>
      </Link>
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

const getCategoryPart = (reco = {}) => {
    const CategoryButton = getCategoryButtonForCategory(reco.category);
    if(CategoryButton) {
      return (
          <div>
              <CategoryButton />
          </div>
      );
    } else {
      return '';
    }
};

const getRecommendedByPart = (reco = {}) => {
  if(reco.recommender) {
    return (
      <p style={softTextStyle}>
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
      <div style={softTextStyle}>
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
        <div style={ratingSelectorStyle}>
          <RatingSelector rating={reco.rating} onChangedRating={ onChangedRating.bind(this, reco.id) }></RatingSelector>
        </div>
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
    reco: getReco(state, params.recoId),
    isLoading: isEditing(state)
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
