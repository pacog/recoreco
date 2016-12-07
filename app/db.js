const addReco = () => {
  console.log('db add reco');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 5000);
  });
};

const login = () => {
  console.log('db login');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 5000);
  });
};

const logout = () => {
  console.log('db login');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 5000);
  });
};

export const db = {
  addReco,
  login,
  logout
};
