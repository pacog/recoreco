import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

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
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button
          onClick={this.addButtonClicked}
          disabled={!this.state.value}>
          <FormattedMessage {...messages.add} />
        </button>
      </div>
    );
  }
}
