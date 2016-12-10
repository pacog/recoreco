import { FirebaseList } from '../firebase/firebase-list';
import {
  createRecoSuccess,
  updateRecoSuccess,
  loadRecosSuccess,
  deleteRecoSuccess
} from './actions';
import Reco from './reco';

export const recoList = new FirebaseList({
  onAdd: createRecoSuccess,
  onChange: updateRecoSuccess,
  onLoad: loadRecosSuccess,
  onRemove: deleteRecoSuccess
}, Reco);
