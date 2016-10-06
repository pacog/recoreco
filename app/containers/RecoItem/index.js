import React from 'react';

const RecoItem = ({reco}) => (
  <div>## {reco} ##</div>
);

RecoItem.propTypes = {
    reco: React.PropTypes.string.isRequired
};

export default RecoItem;
