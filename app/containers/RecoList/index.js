import React from 'react';

const RecoList = ({recos}) => (
  <ul>
    {
      recos.map( (reco, index) => {
          return <li key={`reco-${index}`>{reco}</li>;
      })
    }
  </ul>
);

RecoList.propTypes = {
    recos: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
};

export default RecoList;
