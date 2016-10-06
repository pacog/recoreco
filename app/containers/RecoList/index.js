import React from 'react';
// import RecoItem from '../RecoItem';
import {List, ListItem} from 'material-ui/List';

const RecoList = ({recos}) => (
  <List>
    {
      recos.map( (reco, index) => {
          return (
            <ListItem
              key={`reco-${index}`}
              primaryText={reco} />
          );
      })
    }
  </List>
);

RecoList.propTypes = {
    recos: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
};

export default RecoList;
