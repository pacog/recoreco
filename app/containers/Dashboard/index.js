import React from 'react';
import AddReco from '../AddReco';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import FloatingAddButton from '../../components/FloatingAddButton';
import RecoList from '../../components/RecoList';
import { Card, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const Dashboard = ({ recos }) => {
  return (
    <div>
      <AppBar
        title={'RecoReco'}
        showMenuIconButton={false}
        iconElementRight={<FlatButton label="Add" />}
        onRightIconButtonTouchTap={
          () => {
            browserHistory.push('/add');
          }
        }/>
      <Card>
        <CardText>
          <RecoList recos={recos} />
        </CardText>
      </Card>
      <FloatingAddButton />
    </div>
  );
};

const mapStateToProps = (state) => ({
    recos: state.recos
});

const DashboardContainer = connect(mapStateToProps)(Dashboard);

export default DashboardContainer;
