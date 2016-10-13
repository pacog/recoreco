import React from 'react';
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

RecoList.propTypes = {
    recos: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

export default RecoList;
