import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import RecoLink from '../RecoLink';
import { Link } from 'react-router';

const RecoList = ({recos}) => {
  if(recos && recos.length) {
    return getRecoList(recos);
  } else {
    return getEmptyState();
  }
};

RecoList.propTypes = {
  recos: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

const getRecoList = (recos) => (
  <div>
    {
      recos.map( (reco, index) => {
          return (
            <RecoLink
              key={`reco-${reco.id}`}
              reco={reco}
              ></RecoLink>
          );
      })
    }
  </div>
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

export default RecoList;
