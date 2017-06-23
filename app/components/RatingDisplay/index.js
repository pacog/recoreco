import React from 'react';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import { DARK_PURPLE, YELLOW, GREY, WHITE } from '../../core/theme';

const ICON_BUTTON_SIZE = 16;

const baseStarStyle = {
  borderRadius: '50%',
  height: ICON_BUTTON_SIZE,
  width: ICON_BUTTON_SIZE,
  padding: 1,
  marginRight: 1
};

const starStyles = {
  unselected: {
    ...baseStarStyle,
    color: WHITE,
    backgroundColor: GREY
  },
  selected: {
    ...baseStarStyle,
    color: YELLOW,
    backgroundColor: DARK_PURPLE
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
