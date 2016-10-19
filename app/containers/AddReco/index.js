import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { Card, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';

const blockStyle = {
  display: 'block'
}

let nextRecoId = 0;
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

  resetState() {
    this.setState(emptyState);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleRecommenderChange(event) {
    this.setState({ recommender: event.target.value });
  }

  addButtonClicked(event) {
      this.dispatch({
          type: 'ADD_RECO',
          name: this.state.name,
          recommender: this.state.recommender,
          id: nextRecoId++
        });

      this.resetState();
  }

  render() {
    return (
      <div>
        <AppBar
          title={'RecoReco'}
          showMenuIconButton={false}/>
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
              label={'Add'}
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
