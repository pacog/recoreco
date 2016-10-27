import React from 'react';
import ActionGrade from 'material-ui/svg-icons/action/grade';

const starStyles = {
  unselected: {
    color: '#aaa'
  },
  selected: {
    color: '#D7D70E'
  }
};

const RatingDisplay = (props) => {
  return (
    <div>
      {getStar(1, props)}
      {getStar(2, props)}
      {getStar(3, props)}
      {getStar(4, props)}
      {getStar(5, props)}
    </div>
  );
};

RatingDisplay.propTypes = {
  rating: React.PropTypes.number
};

const getStar = (starValue, props) => {
  return (
    <ActionGrade style={ getStarStyle(starValue, props.rating) }/>
  );
};

const getStarStyle = (starRating, currentRating) => {
  if(typeof currentRating === 'undefined') {
    return starStyles.unselected;
  }
  if(starRating <= currentRating) {
    return starStyles.selected;
  }
  return starStyles.unselected;
};

export default RatingDisplay;
