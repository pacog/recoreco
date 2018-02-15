import React from 'react';

import { recosActions, getUnseenRecos } from '../../core/recos';
import { isLoading } from '../../core/loading';
import { connect } from 'react-redux';

import Header from '../Header';
import Footer from '../../components/Footer';
import CategorySelector from '../../components/CategorySelector';
import RecoList from '../../components/RecoList';
import LoadingIndicator from '../../components/LoadingIndicator';
import { Card, CardText } from 'material-ui/Card';

export class Dashboard extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  getContentPart = (recos, loading) => {
    if(loading) {
      return <LoadingIndicator />;
    } else {
      return (
        <div>
            <CategorySelector
                value={this.state? this.state.category: null}
                onChange={this.handleCategoryChange}/>
                <Card>
                  <CardText>
                    <RecoList recos={this.filterRecos(recos)} showIcons={!this.state.category}/>
                  </CardText>
                </Card>
        </div>
      );
    }
  };

  handleCategoryChange = (newCategory) => {
      if(this.state.category === newCategory) {
          newCategory = null;
      }
      this.setState({ category: newCategory });
  };

  // TODO: this filter could be done in redux selector, but i don't know how to
  // access local state from mapStateToProps
  filterRecos = (recos) => {
      if(!this.state.category) {
          return recos;
      } else {
          return recos.filter(reco => reco.category === this.state.category);
      }
  };

  render() {
    return (
      <div>
        <Header
          title={'To watch'}
          />
          { this.getContentPart(this.props.recos, this.props.isLoading) }
        <Footer active={'toWatch'} />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
    return {
        recos: getUnseenRecos(state),
        isLoading: isLoading(state)
    }
};

const mapDispatchToProps = Object.assign(
  {},
  recosActions
);

const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default DashboardContainer;
