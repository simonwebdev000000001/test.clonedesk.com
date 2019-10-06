import { API, appName } from '../../config';
import { Record } from 'immutable';
import { all, cps, call, put, take, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { createSelector } from 'reselect';


export const ReducerRecord = Record({
  sidebar: null,
  showSidebar: true,
  loading: false,
  error: null,
});

export const moduleName = 'home';
export const SIDEBAR_LOAD = `${appName}/${moduleName}/SIDEBAR_LOAD`;
export const SIDEBAR_SUCCESS = `${appName}/${moduleName}/SIDEBAR_SUCCESS`;
export const SIDEBAR_ERROR = `${appName}/${moduleName}/SIDEBAR_ERROR`;
export const SIDEBAR_REQUEST = `${appName}/${moduleName}/SIDEBAR_REQUEST`;
export const SET_VAL = `${appName}/${moduleName}/SET_VAL`;
export const SET_VAL_SUCCESS = `${appName}/${moduleName}/SET_VAL_SUCCESS`;

export default function reducer(state = new ReducerRecord(), action: any) {
  const { type, payload, error } = action;

  switch (type) {

    case SIDEBAR_REQUEST:
      return state.set('loading', true);
    case SIDEBAR_SUCCESS: {
      return state
        .set('loading', false)
        .set('sidebar', action.payload)
        .set('error', null);
    }
    case SET_VAL_SUCCESS: {
      return state
        .set(action.payload.key, action.payload.value);
    }
    case SIDEBAR_ERROR:
      return state
        .set('loading', false)
        .set('error', error);

    default:
      return state;
  }
}

export const stateSelector = (state: any) => state[moduleName];
export const sideBarSelector = createSelector(
  stateSelector,
  (state: any) => state.sidebar,
);
export const showSidebar = createSelector(
  stateSelector,
  (state: any) => state.showSidebar,
);


export function sidebars() {
  return {
    type: SIDEBAR_LOAD,
  };
}

export function setVal(payload: any) {
  return {
    type: SET_VAL,
    payload,
  };
}

const sidebarsSaga = function* (action: any) {
  try {
    yield put({
      type: SIDEBAR_REQUEST,
    });
    const res = yield call(() => {
        return axios.get(
          `${API}sidebar`,
        );
      },
    );
    if (res.data.body.success === false) {
      throw res.data.body;
    }
    yield put({
      type: SIDEBAR_SUCCESS,
      payload: res.data.body,
    });
  } catch (error) {
    yield put({
      type: SIDEBAR_ERROR,
      error,
    });
  }
};
const setValSaga = function* ({payload}: any) {
  yield put({
    type: SET_VAL_SUCCESS,
    payload,
  });
};


export const saga = function* () {
  yield all([
    takeEvery(SIDEBAR_LOAD, sidebarsSaga),
    takeEvery(SET_VAL, setValSaga),
  ]);
};
