import React from 'react';
import { connect } from 'react-redux';
// import RecoItem from '../RecoItem';
import {List, ListItem} from 'material-ui/List';

const RecoList = ({recos}) => (
  <List>
    {
      recos.map( (reco, index) => {
          return (
            <ListItem
              key={`reco-${reco.id}`}
              primaryText={reco.name} />
          );
      })
    }
  </List>
);

const mapStateToProps = (state) => {
  return {
    recos: state.recos
  };
}

const RecoListContainer = connect(mapStateToProps)(RecoList);

export default RecoListContainer;
