import Dashboard from './containers/Dashboard';
import Reco from './containers/Reco';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Recommender from './containers/Recommender';
import History from './containers/History';
import AddReco from './containers/AddReco';
import EditReco from './containers/EditReco';
import Recommenders from './containers/Recommenders';

const checkLoggedIn = (nextState, replace) => {
  // if (!auth.loggedIn()) {
  //   replace({
  //     pathname: '/login'
  //   })
  // }
}

const routeConfig = [
  { path: '/',
    component: Dashboard,
    onEnter: checkLoggedIn
  },
  { path: '/login',
    component: Login
  },
  { path: '/signup',
    component: Signup
  },
  { path: '/history',
    component: History
  },
  { path: '/add',
    component: AddReco
  },
  { path: '/recommenders',
    component: Recommenders
  },
  { path: '/reco/:recoId',
    component: Reco
  },
  { path: '/recommender/:recommender',
    component: Recommender
  },
  { path: '/edit-reco/:recoId',
    component: EditReco
  }
];

export default routeConfig;
