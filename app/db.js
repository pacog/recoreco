const addReco = () => {
  console.log('db add reco');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 5000);
  });
};

export const db = {
  addReco
};
