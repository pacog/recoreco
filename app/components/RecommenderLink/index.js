import React from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import KeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
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

const ratingStyle = {
  marginRight: 5
};

const RecommenderLink = ({recommender}) => {
  return (
    <Link
      style={linkStyle}
      to={`/recommender/${recommender.name}`}>
        <RaisedButton
          style={buttonStyle}
          fullWidth={true}>
          { getLinkContent(recommender) }
        </RaisedButton>
    </Link>
  );
};

RecommenderLink.propTypes = {
  recommender: React.PropTypes.object.isRequired
};

const getLinkContent = (recommender) => {
  return (
    <div style={contentStyle}>
      <div style={contentInnerStyle}>
        <span style={mainTextStyle}>{recommender.name}</span>
      </div>
      { getRatingContent(recommender) }
      <KeyboardArrowRight />
    </div>
  );
};

const getRatingContent = (recommender) => {
  if(!recommender.average) {
    return '';
  }
  return (
    <div style={ratingStyle}>
      <RatingDisplay rating={recommender.average}></RatingDisplay>
    </div>
  );
};

export default RecommenderLink;
