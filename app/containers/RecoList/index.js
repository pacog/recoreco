import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import KeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

let SelectableList = makeSelectable(List);

const RecoList = ({recos}) => {
  if(recos && recos.length) {
    return getRecoList(recos);
  } else {
    return getEmptyState();
  }
};

const getRecoList = (recos) => (
  <SelectableList onChange={
      (event, selectedReco) => {
        browserHistory.push('/reco/' + selectedReco.id);
      }
    }>
    {
      recos.map( (reco, index) => {
          return (
            <ListItem
              value={reco}
              key={`reco-${reco.id}`}
              primaryText={reco.name}
              secondaryText={reco.recommender}
              rightIcon={<KeyboardArrowRight />} />
          );
      })
    }
  </SelectableList>
);

const getEmptyState = () => (
  <div>
    <p>No recommendations yet.</p>
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
    recos: state.recos
});

const RecoListContainer = connect(mapStateToProps)(RecoList);

export default RecoListContainer;
