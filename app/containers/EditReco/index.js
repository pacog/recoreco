import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { recosActions } from '../../core/recos';
import { getRecommenders, getReco } from '../../core/recos';
import { isEditing } from '../../core/loading';

import Header from '../Header';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';
import LoadingIndicator from '../../components/LoadingIndicator';

const blockStyle = {
  display: 'block'
}

class EditReco extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super();
    this.state = {
      ...props.reco
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleRecommenderChange = this.handleRecommenderChange.bind(this);
    this.saveButtonClicked = this.saveButtonClicked.bind(this);
    this.dispatchSaveButtonClicked = props.dispatchSaveButtonClicked; //Probably there is a better way to have evrything being into this.
    this.recommenders = props.recommenders;
    this.props = props;
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleRecommenderChange(value) {
    this.setState({ recommender: value });
  }

  saveButtonClicked() {
    this.dispatchSaveButtonClicked(this.state.key, this.state.name, this.state.recommender);
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
    if(this.props.isLoading) {
      return <LoadingIndicator />;
    }
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
              filter={AutoComplete.fuzzyFilter}
              maxSearchResults={5}
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
    recommenders: getRecommenders(state).map( reco => reco.name),
    reco: getReco(state, params.recoId),
    isLoading: isEditing(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSaveButtonClicked: (id, name, recommender) => {
      dispatch(recosActions.editReco(id, {name, recommender}))
        .then(() => {
          browserHistory.goBack();
        });
    }
  };
};

const EditRecoContainer = connect(mapStateToProps, mapDispatchToProps)(EditReco);

export default EditRecoContainer;
