import { saga as authSaga } from '../ducks/auth';
import { saga as homeSaga } from '../ducks/home';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([
    authSaga(),
    homeSaga(),
  ]);
}
