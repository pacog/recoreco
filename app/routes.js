import Dashboard from './containers/Dashboard';
import Reco from './containers/Reco';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Recommender from './containers/Recommender';
import History from './containers/History';
import AddReco from './containers/AddReco';
import EditReco from './containers/EditReco';
import Recommenders from './containers/Recommenders';
import { getLoggedInUser } from './store';

const checkLoggedIn = (nextState, replace) => {
  if(!getLoggedInUser(nextState)) {
    replace({
      pathname: '/login'
    });
  }
}

const checkNotLoggedIn = (nextState, replace) => {
  if(!!getLoggedInUser(nextState)) {
    replace({
      pathname: '/'
    });
  }
}

const routeConfig = [
  { path: '/',
    component: Dashboard,
    onEnter: checkLoggedIn
  },
  { path: '/login',
    component: Login,
    onEnter: checkNotLoggedIn
  },
  { path: '/signup',
    component: Signup,
    onEnter: checkNotLoggedIn
  },
  { path: '/history',
    component: History,
    onEnter: checkLoggedIn
  },
  { path: '/add',
    component: AddReco,
    onEnter: checkLoggedIn
  },
  { path: '/recommenders',
    component: Recommenders,
    onEnter: checkLoggedIn
  },
  { path: '/reco/:recoId',
    component: Reco,
    onEnter: checkLoggedIn
  },
  { path: '/recommender/:recommender',
    component: Recommender,
    onEnter: checkLoggedIn
  },
  { path: '/edit-reco/:recoId',
    component: EditReco,
    onEnter: checkLoggedIn
  }
];

export default routeConfig;
