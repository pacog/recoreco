export const mainReducer = (state, action = {}) => {

  switch (action.type) {
    case 'ADD_RECO':
      return {
        ...state,
        recos: state.recos.concat([{
          id: action.id,
          name: action.name
        }])
      };
    default:
      return state;
  }
};
