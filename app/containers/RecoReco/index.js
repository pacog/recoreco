import React from 'react';
import AddReco from '../AddReco';
import RecoList from '../RecoList';
import { Card, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';

let nextRecoId = 0;

class RecoReco extends React.Component {

  constructor() {
    super();
  }

  addReco(recoName) {
    const { store } = this.context;

    store.dispatch({
        type: 'ADD_RECO',
        name: recoName,
        id: nextRecoId++
      });
  }

  render() {

    const { store } = this.context;
    const state = store.getState();

    return (
      <div>
        <AppBar
          title={'RecoReco'}
          showMenuIconButton={false}/>
        <Card>
          <CardText>
            <AddReco addReco={this.addReco.bind(this)} />
            <RecoList recos={state.recos}/>
          </CardText>
        </Card>
      </div>
    );
  }
}
RecoReco.contextTypes = {
  store: React.PropTypes.object
}
export default RecoReco;
