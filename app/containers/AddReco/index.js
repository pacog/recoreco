import React from 'react';
import TextField from 'material-ui/TextField';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import RaisedButton from 'material-ui/RaisedButton';

const buttonStyle = {
  marginLeft: 12
}

export default class AddReco extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.addButtonClicked = this.addButtonClicked.bind(this);
    this.notifyAddReco = props.addReco;
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  addButtonClicked(event) {
    if(this.state.value) {
      this.notifyAddReco(this.state.value);
      this.setState({
        value: ''
      });
    }
  }

  render() {
    return (
      <div>
        <TextField
          hintText={<FormattedMessage {...messages.newReco} />}
          type='text'
          value={this.state.value}
          onChange={this.handleChange}
        />
        <RaisedButton
          label={<FormattedMessage {...messages.add} />}
          style={buttonStyle}
          primary={true}
          onClick={this.addButtonClicked}
          disabled={!this.state.value} />
      </div>
    );
  }
}

AddReco.propTypes = {
    addReco: React.PropTypes.func.isRequired
};
