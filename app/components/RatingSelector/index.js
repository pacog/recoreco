import React from 'react';
import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import { DARK_PURPLE, YELLOW, GREY, WHITE } from '../../core/theme';

const ICON_BUTTON_SIZE = 42;

const iconButtonContainerStyle = {
  height: ICON_BUTTON_SIZE,
  width: ICON_BUTTON_SIZE,
  border: 0,
  padding: 0,
  marginLeft: 4,
  marginRight: 4
}

const baseStarStyle = {
  borderRadius: '50%',
  height: ICON_BUTTON_SIZE,
  width: ICON_BUTTON_SIZE,
  padding: 4
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

const RatingSelector = (props) => {
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

RatingSelector.propTypes = {
  rating: React.PropTypes.number,
  onChangedRating: React.PropTypes.func.isRequired
};

const getStar = (starValue, props) => {
  const onStarClicked = () => {
    props.onChangedRating(starValue)
  };
  return (
    <IconButton
      style={iconButtonContainerStyle}
      onClick={onStarClicked}
      touch={true}
      iconStyle={ getStarStyle(starValue, props.rating) }>
      <ActionGrade />
    </IconButton>
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

export default RatingSelector;
