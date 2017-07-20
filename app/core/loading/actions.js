import {
  START_LOADING,
  END_LOADING,
  START_ADDING,
  END_ADDING,
  START_EDITING,
  END_EDITING,
} from './action-types';

export const startLoading = () => ({
    type: START_LOADING
});

export const endLoading = () => ({
    type: END_LOADING
});

export const startAdding = () => ({
    type: START_ADDING
});

export const endAdding = () => ({
    type: END_ADDING
});

export const startEditing = () => ({
    type: START_EDITING
});

export const endEditing = () => ({
    type: END_EDITING
});
