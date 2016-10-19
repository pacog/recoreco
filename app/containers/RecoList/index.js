import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';

const RecoList = ({recos}) => {
  if(recos && recos.length) {
    return getRecoList(recos);
  } else {
    return getEmptyState();
  }
};

const getRecoList = (recos) => (
  <List>
    {
      recos.map( (reco, index) => {
          return (
            <ListItem
              key={`reco-${reco.id}`}
              primaryText={reco.name}
              secondaryText={reco.recommender}/>
          );
      })
    }
  </List>
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
