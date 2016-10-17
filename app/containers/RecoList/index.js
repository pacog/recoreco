import React from 'react';
import { connect } from 'react-redux';
import {List, ListItem} from 'material-ui/List';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

const RecoList = ({recos}) => {

  if(recos && recos.length) {
    return (
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
  } else {
    return (
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
  }
};

const mapStateToProps = (state) => {
  return {
    recos: state.recos
  };
}

const RecoListContainer = connect(mapStateToProps)(RecoList);

export default RecoListContainer;
