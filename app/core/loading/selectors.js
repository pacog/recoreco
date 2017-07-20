export const isLoading = (state) => {
  return state.loading.loading;
}

export const isAdding = (state) => {
  return state.loading.loading || state.loading.adding;
}

export const isEditing = (state) => {
  return state.loading.loading || state.loading.editing;
}
