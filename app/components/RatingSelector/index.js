import React from 'react';
import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/action/grade';

const starStyles = {
  unselected: {
    color: '#aaa'
  },
  selected: {
    color: 'yellow'
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
