import { recoList } from './reco-list';
import {
  ADD_RECO,
  ADD_RECO_ERROR,
  EDIT_RECO,
  REMOVE_RECO,
  MARK_RECO_AS_SEEN,
  MARK_RECO_AS_NOT_SEEN,
  RATE_RECO
} from './action-types';

export const addReco = (recoName, recommender = '') => {
  return dispatch => {
    recoList.push({recoName, recommender})
      .catch(error => dispatch(addRecoError(error)));
  };
}

//TODO: do and test
export function addRecoError(error) {
  return {
    type: ADD_RECO_ERROR,
    payload: error
  };
}

//TODO: check if there is already a reco
export const addRecoSuccess = (reco) => ({
  type: ADD_RECO,
  reco,
  added: (new Date().getTime())
});









// export function deleteTask(task) {
//   return dispatch => {
//     taskList.remove(task.key)
//       .catch(error => dispatch(deleteTaskError(error)));
//   };
// }
//
// export function deleteTaskError(error) {
//   return {
//     type: DELETE_TASK_ERROR,
//     payload: error
//   };
// }
//
// export function deleteTaskSuccess(task) {
//   return {
//     type: DELETE_TASK_SUCCESS,
//     payload: task
//   };
// }
//
// export function updateTaskError(error) {
//   return {
//     type: UPDATE_TASK_ERROR,
//     payload: error
//   };
// }
//
// export function updateTask(task, changes) {
//   return dispatch => {
//     taskList.update(task.key, changes)
//       .catch(error => dispatch(updateTaskError(error)));
//   };
// }
//
// export function updateTaskSuccess(task) {
//   return {
//     type: UPDATE_TASK_SUCCESS,
//     payload: task
//   };
// }
//
// export function loadTasksSuccess(tasks) {
//   return {
//     type: LOAD_TASKS_SUCCESS,
//     payload: tasks
//   };
// }

// export function loadTasks() {
//   return (dispatch, getState) => {
//     const { auth } = getState();
//     taskList.path = `tasks/${auth.id}`;
//     taskList.subscribe(dispatch);
//   };
// }
//
// export function unloadTasks() {
//   taskList.unsubscribe();
//   return {
//     type: UNLOAD_TASKS_SUCCESS
//   };
// }









export const editReco = (id, recoName, recommender = '') => ({
  id: id,
  type: EDIT_RECO,
  name: recoName,
  recommender: recommender
});


export const removeReco = (id) => ({
  type: REMOVE_RECO,
  id
});

export const markAsSeen = (id) => ({
  type: MARK_RECO_AS_SEEN,
  id
});

export const markAsUnSeen = (id) => ({
  type: MARK_RECO_AS_NOT_SEEN,
  id
});

export const rateReco = (id, rating) => ({
  type: RATE_RECO,
  id,
  rating
});
