import React from 'react';
import { connect } from 'react-redux';
// import {List, ListItem} from 'material-ui/List';
// import { Link } from 'react-router';
// import RaisedButton from 'material-ui/RaisedButton';

const Reco = ({params}) => {
  return <div>MyReco {params.recoId}</div>;
};

// const mapStateToProps = (state) => {
//   return {
//     recos: state.recos
//   };
// }

const RecoContainer = connect()(Reco);

export default RecoContainer;
