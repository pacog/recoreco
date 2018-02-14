import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { recosActions } from '../../core/recos';
import { getRecommenders } from '../../core/recos';
import { isAdding } from '../../core/loading';

import Header from '../Header';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import AutoComplete from 'material-ui/AutoComplete';
import Footer from '../../components/Footer';
import LoadingIndicator from '../../components/LoadingIndicator';
import CategorySelector from '../../components/CategorySelector';

const blockStyle = {
  display: 'block'
}

const emptyState = { name: '', recommender: '' };

class AddReco extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super();
    this.props = props;
    this.state = emptyState;
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleRecommenderChange = this.handleRecommenderChange.bind(this);
    this.addButtonClicked = this.addButtonClicked.bind(this);
    this.dispatchAddButtonClicked = props.dispatchAddButtonClicked; //Probably there is a better way to have evrything being into this.
    this.recommenders = props.recommenders;
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleRecommenderChange(value) {
    this.setState({ recommender: value });
  }

  addButtonClicked() {
    this.dispatchAddButtonClicked(this.state.name, this.state.recommender);
  }

  closeButtonClicked() {
    browserHistory.goBack();
  }

  render() {
    return (
      <div>
        <Header
          title={'Add Reco'}
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
              dataSource={this.recommenders}
              onUpdateInput={this.handleRecommenderChange}
              onNewRequest={this.handleRecommenderChange}
              style={blockStyle}
              filter={AutoComplete.fuzzyFilter}
              maxSearchResults={5}
            />
            <CategorySelector
                value={this.state.name}
                onChange={this.handleCategoryChange}/>
            <RaisedButton
              label={'Save'}
              style={blockStyle}
              primary={true}
              onClick={this.addButtonClicked}
              disabled={!this.state.name || this.props.isLoading} />
          </CardText>
        </Card>
        { getLoadingPart(this.props.isLoading) }
        <Footer active={'add'} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recommenders: getRecommenders(state).map( reco => reco.name),
    isLoading: isAdding(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchAddButtonClicked: (name, recommender) => {
      dispatch(recosActions.addReco({ name, recommender })).then(() => {
        browserHistory.push('/')
      });
    }
  };
};

const getLoadingPart = (loading) => {
  if(loading) {
    return <LoadingIndicator />;
  } else {
    return '';
  }

}

const AddRecoContainer = connect(mapStateToProps, mapDispatchToProps)(AddReco);

export default AddRecoContainer;
