import React from 'react';
import { connect } from 'react-redux';
import { getRecommenders } from '../../core/recos';
import { isLoading } from '../../core/loading';

import LoadingIndicator from '../../components/LoadingIndicator';
import RecommenderLink from '../../components/RecommenderLink';

const style = {
  paddingBottom: 60,
};

const RecommendersList = ({recommenders, loading}) => {
  if(loading) {
    return getLoading();
  }
  if(recommenders && recommenders.length) {
    return getRecommendersList(recommenders);
  } else {
    return getEmptyState();
  }
};

const getLoading = () => {
  return <LoadingIndicator />;
};

const getRecommendersList = (recommenders) => (
  <div style={style}>
    {
      recommenders.map( (recommender) => {
          return (
            <RecommenderLink
              key={`recommender-${recommender.name}`}
              recommender={recommender}
              ></RecommenderLink>
          );
      })
    }
  </div>
);

const getEmptyState = () => (
  <div>
    <p>No recommenders yet.</p>
    <Link
      to={'add'}
    >
      <RaisedButton
        label={'Add new reco'}
        primary={true}/>
    </Link>
  </div>
);

const mapStateToProps = (state) => ({
    recommenders: getRecommenders(state),
    loading: isLoading(state)
});

const RecommendersListContainer = connect(mapStateToProps)(RecommendersList);

export default RecommendersListContainer;
