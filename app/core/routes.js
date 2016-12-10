import Dashboard from '../containers/Dashboard';
import Reco from '../containers/Reco';
import Login from '../containers/Login';
import Signup from '../containers/Signup';
import Recommender from '../containers/Recommender';
import History from '../containers/History';
import AddReco from '../containers/AddReco';
import EditReco from '../containers/EditReco';
import Recommenders from '../containers/Recommenders';
import { getLoggedInUser } from './auth';

const checkLoggedIn = (getState) => {
  return (nextState, replace) => {
    if(!getLoggedInUser(getState())) {
      replace({
        pathname: '/login'
      });
    }
  };
};

const checkNotLoggedIn = (getState) => {
  return (nextState, replace) => {
    if(!!getLoggedInUser(getState())) {
      replace({
        pathname: '/'
      });
    }
  };
};

export const getRoutes = (getState) => {
  return [
    { path: '/',
      component: Dashboard,
      onEnter: checkLoggedIn(getState)
    },
    { path: '/login',
      component: Login,
      onEnter: checkNotLoggedIn(getState)
    },
    { path: '/signup',
      component: Signup,
      onEnter: checkNotLoggedIn(getState)
    },
    { path: '/history',
      component: History,
      onEnter: checkLoggedIn(getState)
    },
    { path: '/add',
      component: AddReco,
      onEnter: checkLoggedIn(getState)
    },
    { path: '/recommenders',
      component: Recommenders,
      onEnter: checkLoggedIn(getState)
    },
    { path: '/reco/:recoId',
      component: Reco,
      onEnter: checkLoggedIn(getState)
    },
    { path: '/recommender/:recommender',
      component: Recommender,
      onEnter: checkLoggedIn(getState)
    },
    { path: '/edit-reco/:recoId',
      component: EditReco,
      onEnter: checkLoggedIn(getState)
    }
  ]
};
