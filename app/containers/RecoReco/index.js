import React from 'react';
import AddReco from '../AddReco';
import RecoList from '../RecoList';
import { Card, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';

class RecoReco extends React.Component {

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
        <AppBar
          title={'RecoReco'}
          showMenuIconButton={false}/>
        <Card>
          <CardText>
            <AddReco addReco={this.addReco.bind(this)} />
            <RecoList recos={this.state.recos}/>
          </CardText>
        </Card>
      </div>
    );
  }
}

export default RecoReco;
