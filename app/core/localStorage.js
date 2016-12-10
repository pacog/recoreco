export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch(err) {
    console.warn('ERROR saving to local storage');
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if(serializedState === null) {
      return null;
    }
    return JSON.parse(serializedState);
  } catch(err) {
    return undefined;
  }
}
