import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { recosActions } from '../../core/recos';
import { getRecommenders } from '../../core/recos';

import Header from '../Header';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import AutoComplete from 'material-ui/AutoComplete';
import Footer from '../../components/Footer';

const blockStyle = {
  display: 'block'
}

const emptyState = { name: '', recommender: '' };

class AddReco extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor({ recommenders, dispatchAddButtonClicked }) {
    super();
    this.state = emptyState;
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleRecommenderChange = this.handleRecommenderChange.bind(this);
    this.addButtonClicked = this.addButtonClicked.bind(this);
    this.dispatchAddButtonClicked = dispatchAddButtonClicked; //Probably there is a better way to have evrything being into this.
    this.recommenders = recommenders;
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleRecommenderChange(value) {
    this.setState({ recommender: value });
  }

  addButtonClicked() {
    this.dispatchAddButtonClicked(this.state.name, this.state.recommender);
  }

  closeButtonClicked() {
    browserHistory.goBack();
  }

  render() {
    return (
      <div>
        <Header
          title={'Add Reco'}
          iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          onLeftIconButtonTouchTap={this.closeButtonClicked}
          />
        <Card>
          <CardText>
            <TextField
              hintText={'Recommendation name'}
              style={blockStyle}
              type='text'
              value={this.state.name}
              onChange={this.handleNameChange}
            />
            <AutoComplete
              hintText='Who recommended it?'
              dataSource={this.recommenders}
              onUpdateInput={this.handleRecommenderChange}
              onNewRequest={this.handleRecommenderChange}
              style={blockStyle}
            />
            <RaisedButton
              label={'Save'}
              style={blockStyle}
              primary={true}
              onClick={this.addButtonClicked}
              disabled={!this.state.name} />
          </CardText>
        </Card>
        <Footer active={'add'} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recommenders: getRecommenders(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchAddButtonClicked: (name, recommender) => {
      dispatch(recosActions.addReco(name, recommender)).then(() => {
        browserHistory.push('/')
      });
    }
  };
};

const AddRecoContainer = connect(mapStateToProps, mapDispatchToProps)(AddReco);

export default AddRecoContainer;
