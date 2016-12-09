import React from 'react';
import { connect } from 'react-redux';
import { getRecommenders } from '../../store';

import { Link } from 'react-router';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import KeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

let SelectableList = makeSelectable(List);

const RecommendersList = ({recommenders}) => {
  if(recommenders && recommenders.length) {
    return getRecommendersList(recommenders);
  } else {
    return getEmptyState();
  }
};

const getRecommendersList = (recos) => (
  <SelectableList onChange={
      (event, selectedRecommender) => {
        browserHistory.push('/recommender/' + encodeURI(selectedRecommender));
        event.stopPropagation();
        event.preventDefault();
      }
    }>
    {
      recos.map( (recommender) => {
          return (
            <ListItem
              value={recommender}
              key={`recommender-${encodeURI(recommender)}`}
              primaryText={recommender}
              rightIcon={<KeyboardArrowRight />} />
          );
      })
    }
  </SelectableList>
);

const getEmptyState = () => (
  <div>
    <p>No recommenders yet.</p>
    <Link
      to={'add'}
    >
      <RaisedButton
        label={'Add new reco'}
        primary={true}/>
    </Link>
  </div>
);

const mapStateToProps = (state) => ({
    recommenders: getRecommenders(state)
});

const RecommendersListContainer = connect(mapStateToProps)(RecommendersList);

export default RecommendersListContainer;
