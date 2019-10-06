import { API, appName } from '../config';
import { Record } from 'immutable';
import { all, cps, call, put, take, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { createSelector } from 'reselect';

const access_token = localStorage.getItem('access_token');
if (access_token) applyHeader(access_token, localStorage.getItem('userId'), localStorage.getItem('coockie'));

function applyHeader(access_token: string = '', userId: any, coockie: any) {
  axios.defaults.headers.common['x-api-key'] = access_token;
  axios.defaults.headers.common['cookies'] = coockie;
  if (access_token) {
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('coockie', coockie);
    localStorage.setItem('userId', userId);
  } else {
    localStorage.removeItem('access_token');
    localStorage.removeItem('userId');
    localStorage.removeItem('coockie');
    delete axios.defaults.headers.common['x-api-key'];
  }
}

export const ReducerRecord = Record({
  user: null,
  loading: false,
  isChecked: false,
  error: null,
});

export const moduleName = 'auth';
export const SIGN_IN = `${appName}/${moduleName}/SIGN_IN`;
export const SIGN_IN_REQUEST = `${appName}/${moduleName}/SIGN_IN_REQUEST`;
export const SIGN_IN_ERROR = `${appName}/${moduleName}/SIGN_IN_ERROR`;
export const SIGN_IN_SUCCESS = `${appName}/${moduleName}/SIGN_IN_SUCCESS`;
export const USER_LOAD = `${appName}/${moduleName}/USER_LOAD`;
export const USER_LOAD_REQUEST = `${appName}/${moduleName}/USER_LOAD_REQUEST`;
export const USER_LOAD_SUCCESS = `${appName}/${moduleName}/USER_LOAD_SUCCESS`;
export const USER_LOAD_ERROR = `${appName}/${moduleName}/USER_LOAD_ERROR`;
export const USER_ABOUT = `${appName}/${moduleName}/USER_ABOUT`;
export const USER_ABOUT_REQUEST = `${appName}/${moduleName}/USER_ABOUT_REQUEST`;
export const USER_ABOUT_SUCCESS = `${appName}/${moduleName}/USER_ABOUT_SUCCESS`;
export const USER_ABOUT_ERROR = `${appName}/${moduleName}/USER_ABOUT_ERROR`;
export const USER_SET_VAL = `${appName}/${moduleName}/USER_SET_VAL`;
export const USER_SET_VAL_SUCCESS = `${appName}/${moduleName}/USER_SET_VAL_SUCCESS`;

export default function reducer(state = new ReducerRecord(), action: any) {
  const { type, payload, error } = action;

  switch (type) {
    case USER_LOAD_REQUEST:
    case USER_ABOUT_REQUEST:
    case SIGN_IN_REQUEST:
      return state.set('loading', true);


    case SIGN_IN_SUCCESS:
    case USER_LOAD_SUCCESS:
    case USER_ABOUT_SUCCESS: {
      return state
        .set('loading', false)
        .set('isChecked', true)
        .set('user', action.payload)
        .set('error', null);
    }
    case USER_ABOUT_ERROR: {
      return state
        .set('loading', false)
        .set('isChecked', true)
        .set('error', null);
    }

    case USER_SET_VAL_SUCCESS: {
      return state
        .set(payload.key, payload.value);
    }

    case SIGN_IN_ERROR:
      return state
        .set('loading', false)
        .set('isChecked', true)
        .set('error', error);

    default:
      return state;
  }
}

export const stateSelector = (state: any) => state[moduleName];
export const userSelector = createSelector(
  stateSelector,
  (state: any) => state.user,
);


export function signIn(user: any) {
  return {
    type: SIGN_IN,
    payload: user,
  };
}

export function loadUser() {
  return {
    type: USER_LOAD,
  };
}

export function setVal(payload: any) {
  return {
    type: USER_SET_VAL,
    payload,
  };
}

const signInSaga = function* (action: any) {
  try {
    yield put({
      type: SIGN_IN_REQUEST,
    });
    const res = yield call(() => {
        return axios.post(
          `${API}login-session`,
          action.payload,
        );
      },
    );
    if (res.data.body.success === false) {
      throw res.data.body;
    }
    applyHeader(res.data.body.session_key, res.data.body.user.id, res.data.headers['set-cookie'][0]);
    yield put({
      type: SIGN_IN_SUCCESS,
      payload: res.data.body.user,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: SIGN_IN_ERROR,
      error,
    });
  }
};

const loadUserSaga = function* () {
  try {
    yield loadInfo();
  } catch (error) {
    yield put({
      type: USER_LOAD_ERROR,
      error,
    });
  }
};
const setValSaga = function* ({ payload }: any) {
  yield put({
    type: USER_SET_VAL_SUCCESS,
    payload,
  });
};

const loadInfo = function* () {
  try {
    yield put({
      type: USER_ABOUT_REQUEST,
    });
    const res = yield call(() => {
      return axios.get(
        `${API}user/${localStorage.getItem('userId')}`,
      );
    });
    if (res.data.body.success === false || !res.data.body.user || !res.data.body.user.id) {
      throw res.data.body;
    }
    yield put({
      type: USER_ABOUT_SUCCESS,
      payload: res.data.body.user,
    });
  } catch (error) {
    yield put({
      type: USER_ABOUT_ERROR,
      error,
    });
  }
};

export const saga = function* () {
  yield all([
    takeEvery(SIGN_IN, signInSaga),
    takeEvery(USER_LOAD, loadUserSaga),
    takeEvery(USER_SET_VAL, setValSaga),
  ]);
};
