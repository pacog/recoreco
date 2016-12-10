import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { recosActions } from '../../core/recos';
import { getRecommenders, getReco } from '../../core/recos';

import Header from '../Header';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';


const blockStyle = {
  display: 'block'
}

class EditReco extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor({ recommenders, reco, dispatchSaveButtonClicked }) {
    super();
    this.state = {
      ...reco
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleRecommenderChange = this.handleRecommenderChange.bind(this);
    this.saveButtonClicked = this.saveButtonClicked.bind(this);
    this.dispatchSaveButtonClicked = dispatchSaveButtonClicked; //Probably there is a better way to have evrything being into this.
    this.recommenders = recommenders;
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleRecommenderChange(value) {
    this.setState({ recommender: value });
  }

  saveButtonClicked() {
    this.dispatchSaveButtonClicked(this.state.id, this.state.name, this.state.recommender);
  }

  closeButtonClicked() {
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
        <Header
          title={'Edit Reco'}
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
              searchText={this.state.recommender}
              dataSource={this.recommenders}
              onUpdateInput={this.handleRecommenderChange}
              onNewRequest={this.handleRecommenderChange}
              style={blockStyle}
            />
            <RaisedButton
              label={'Save'}
              style={blockStyle}
              primary={true}
              onClick={this.saveButtonClicked}
              disabled={!this.state.name} />
          </CardText>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state, { params }) => {
  return {
    recommenders: getRecommenders(state),
    reco: getReco(state, params.recoId)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSaveButtonClicked: (id, name, recommender) => {
      dispatch(recosActions.editReco(id, name, recommender));
      browserHistory.goBack();
    }
  };
};

const EditRecoContainer = connect(mapStateToProps, mapDispatchToProps)(EditReco);

export default EditRecoContainer;
