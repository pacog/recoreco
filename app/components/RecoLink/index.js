import React from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import KeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import timeSince from '../../utils/time-since';
import RatingDisplay from '../RatingDisplay';

const linkStyle = {
  display: 'block',
  textDecoration: 'none'
};

const buttonStyle = {
  marginBottom: 10,
  height: 'auto'
};

const contentStyle = {
  textAlign: 'left',
  padding: 10,
  display: 'flex',
  alignItems: 'center'
};

const contentInnerStyle = {
  flex: 1
};

const mainTextStyle = {
  display: 'block',
  fontSize: 16,
  color: '#121212'
};
const secondaryTextStyle = {
  fontSize: 12,
  color: '#787878'
};

const secondarySoftTextStyle = {
  fontSize: 12,
  color: '#a9a9a9'
};

const ratingStyle = {
  marginRight: 5
};

const RecoLink = ({reco}) => {
  return (
    <Link
      style={linkStyle}
      to={`/reco/${reco.id}`}>
        <RaisedButton
          style={buttonStyle}
          fullWidth={true}>
          { getLinkContent(reco) }
        </RaisedButton>
    </Link>
  );
};

RecoLink.propTypes = {
  reco: React.PropTypes.object.isRequired
};

const getLinkContent = (reco) => {
  return (
    <div style={contentStyle}>
      <div style={contentInnerStyle}>
        <span style={mainTextStyle}>{reco.name}</span>
        { getRecommenderContent(reco) }
        <span style={secondarySoftTextStyle}> {timeSince(reco.added)} ago</span>
      </div>
      { getRatingContent(reco) }
      <KeyboardArrowRight />
    </div>
  );
};

const getRecommenderContent = (reco) => {
  if(reco.recommender) {
    return (
      <span style={secondaryTextStyle}>{reco.recommender} - </span>
    );
  }
  else {
    return '';
  }
};

const getRatingContent = (reco) => {
  if(reco.seen) {
    return (
      <div style={ratingStyle}>
        <RatingDisplay rating={reco.rating}></RatingDisplay>
      </div>
    );
  } else {
    return '';
  }
};

export default RecoLink;
