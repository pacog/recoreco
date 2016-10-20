import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import { addReco } from '../../actions';

const blockStyle = {
  display: 'block'
}

const emptyState = { name: '', recommender: '' };

class AddReco extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor({ dispatch }) {
    super();
    this.state = emptyState;
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleRecommenderChange = this.handleRecommenderChange.bind(this);
    this.addButtonClicked = this.addButtonClicked.bind(this);
    this.dispatch = dispatch;
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleRecommenderChange(event) {
    this.setState({ recommender: event.target.value });
  }

  addButtonClicked(event) {
    this.dispatch(addReco(this.state.name, this.state.recommender));
    browserHistory.push('/');
  }

  closeButtonClicked(event) {
    browserHistory.goBack();
  }

  getHeaderSaveButton() {
    if(this.state.name) {
      return <FlatButton label="Save" />;
    } else {
      return null;
    }
  }

  render() {
    return (
      <div>
        <AppBar
          title={'Add Reco'}
          iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          onLeftIconButtonTouchTap={this.closeButtonClicked}
          iconElementRight={this.getHeaderSaveButton()}
          onRightIconButtonTouchTap={this.addButtonClicked}
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
            <TextField
              hintText={'Who recommended it?'}
              style={blockStyle}
              type='text'
              value={this.state.recommender}
              onChange={this.handleRecommenderChange}
            />
            <RaisedButton
              label={'Save'}
              style={blockStyle}
              primary={true}
              onClick={this.addButtonClicked}
              disabled={!this.state.name} />
          </CardText>
        </Card>
      </div>
    );
  }
}


const AddRecoContainer = connect()(AddReco);

export default AddRecoContainer;
