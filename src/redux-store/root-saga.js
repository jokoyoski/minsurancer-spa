import {all } from 'redux-saga/effects';
import {UiSagas} from '../redux-store/combine-saga'


export default function* RootSaga(dispatch) {
  yield all([
    ...UiSagas
  ]);
}