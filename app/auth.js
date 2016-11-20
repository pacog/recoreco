import { getLoggedInUser } from './store';

class AuthManager {
  setStore(store) {
    this.store = store;
  }

  isLoggedIn() {
    if(this.store) {
      return getLoggedInUser(this.store);
    }
    return false;
  }
}

export const authManager = new AuthManager();
