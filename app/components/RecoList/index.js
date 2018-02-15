import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import RecoLink from '../RecoLink';
import { Link } from 'react-router';

const RecoList = ({recos, showIcons}) => {
  if(recos && recos.length) {
    return getRecoList(recos, showIcons);
  } else {
    return getEmptyState();
  }
};

RecoList.propTypes = {
  recos: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  showIcons: React.PropTypes.bool
};

const style = {
  paddingBottom: 60,
};

const getRecoList = (recos, showIcons) => (
  <div style={style}>
    {
      recos.map( (reco) => {
          return (
            <RecoLink
              key={`reco-${reco.key}`}
              reco={reco}
              showIcons={showIcons}
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
