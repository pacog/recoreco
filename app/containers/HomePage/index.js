import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import AddRecoContainer from '../AddReco'
import RecoList from '../RecoList'
import {Card, CardText} from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';

const style = {
  maxWidth: 700,
  margin: '0 auto'
};

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
      <div style={style}>
        <AppBar
          title={<FormattedMessage {...messages.appName} />}
          showMenuIconButton={false}/>
        <Card>
          <CardText>
            <AddRecoContainer addReco={this.addReco.bind(this)} />
            <RecoList recos={this.state.recos}/>
          </CardText>
        </Card>
      </div>
    );
  }
}
