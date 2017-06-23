import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const style = {
  container: {
    position: 'relative',
    textAlign: 'center',
    marginTop: 50,
    paddingTop: 50,
    paddingBottom: 50
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
};

const LoadingIndicator = () => (
  <div style={style.container}>
    <RefreshIndicator
        size={50}
        left={0}
        top={0}
        status="loading"
        style={style.refresh}
      />
  </div>
);

export default LoadingIndicator;
