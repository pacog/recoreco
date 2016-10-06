import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import AddReco from '../AddReco'
import RecoList from '../RecoList'

export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super();
    this.state = {
      recos: []
    };
  }

  addReco(reco) {
    this.setState({
      recos: this.state.recos.concat([reco])
    });
  }

  render() {
    return (
      <div>
        <h1>
          <FormattedMessage {...messages.appName} />
        </h1>
        <AddReco addReco={this.addReco.bind(this)} />
        <hr />
        <RecoList recos={this.state.recos}/>

      </div>
    );
  }
}
