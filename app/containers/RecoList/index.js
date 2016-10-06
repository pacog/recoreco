import React from 'react';
import RecoItem from '../RecoItem';

const RecoList = ({recos}) => (
  <ul>
    {
      recos.map( (reco, index) => {
          return (
            <li key={`reco-${index}`}>
              <RecoItem reco={reco} />
            </li>
          );
      })
    }
  </ul>
);

RecoList.propTypes = {
    recos: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
};

export default RecoList;
