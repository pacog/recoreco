import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { addRecoToDB } from '../../actions';
import { getRecommenders } from '../../store';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';
import Footer from '../../components/Footer';

const blockStyle = {
  display: 'block'
}

const emptyState = { name: '', recommender: '' };

class AddReco extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor({ recommenders, dispatchAddButtonClicked }) {
    super();
    this.state = emptyState;
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleRecommenderChange = this.handleRecommenderChange.bind(this);
    this.addButtonClicked = this.addButtonClicked.bind(this);
    this.dispatchAddButtonClicked = dispatchAddButtonClicked; //Probably there is a better way to have evrything being into this.
    this.recommenders = recommenders;
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleRecommenderChange(value) {
    this.setState({ recommender: value });
  }

  addButtonClicked(event) {
    this.dispatchAddButtonClicked(this.state.name, this.state.recommender);
  }

  closeButtonClicked(event) {
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
        <AppBar
          title={'Add Reco'}
          iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          onLeftIconButtonTouchTap={this.closeButtonClicked}
          iconElementRight={this.getHeaderSaveButton()}
          onRightIconButtonTouchTap={this.addButtonClicked}
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
              dataSource={this.recommenders}
              onUpdateInput={this.handleRecommenderChange}
              onNewRequest={this.handleRecommenderChange}
              style={blockStyle}
            />
            <RaisedButton
              label={'Save'}
              style={blockStyle}
              primary={true}
              onClick={this.addButtonClicked}
              disabled={!this.state.name} />
          </CardText>
        </Card>
        <Footer active={'add'} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recommenders: getRecommenders(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchAddButtonClicked: (name, recommender) => {
      dispatch(addRecoToDB(name, recommender)).then(() => {
        browserHistory.push('/')
      });
    }
  };
};

const AddRecoContainer = connect(mapStateToProps, mapDispatchToProps)(AddReco);

export default AddRecoContainer;
