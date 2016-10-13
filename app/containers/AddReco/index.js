import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';

const buttonStyle = {
  marginLeft: 12
}

let nextRecoId = 0;

class AddReco extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor({ dispatch }) {
    super();
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.addButtonClicked = this.addButtonClicked.bind(this);
    this.dispatch = dispatch;
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  addButtonClicked(event) {
    if(this.state.value) {
      this.dispatch({
          type: 'ADD_RECO',
          name: this.state.value,
          id: nextRecoId++
        });

      this.setState({
        value: ''
      });
    }
  }

  render() {
    return (
      <div>
        <TextField
          hintText={'Add new reco'}
          type='text'
          value={this.state.value}
          onChange={this.handleChange}
        />
        <RaisedButton
          label={'Add'}
          style={buttonStyle}
          primary={true}
          onClick={this.addButtonClicked}
          disabled={!this.state.value} />
      </div>
    );
  }
}

const AddRecoContainer = connect()(AddReco);

export default AddRecoContainer;
