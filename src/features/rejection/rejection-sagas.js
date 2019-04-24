import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { loadState, saveState } from '../../localStorage';

import rejection, { createQuestion, answerQuestion, deleteQuestion, loadQuestions, getState } from './rejection-reducer';

export const loadLocalStorage = () => ({
  type: 'rejection-sagas/loadLocalStorage'
});

export function* saveLocalState() {
  const state = yield select(getState);

  yield call(saveState, state);
}

export function* loadLocalState() {
  const state = yield call(loadState);

  yield put(loadQuestions(state));
}

function* watchCreateQuestion() {
  yield takeEvery(createQuestion().type, saveLocalState);
};

function* watchAnswerQuestion() {
  yield takeEvery(answerQuestion().type, saveLocalState);
};

function* watchDeleteQuestion() {
  yield takeEvery(deleteQuestion().type, saveLocalState);
};

function* watchLoadLocalStorageState() {
  yield takeEvery(loadLocalStorage().type, loadLocalState);
};

export default function* rootSaga() {
  yield all([
    watchCreateQuestion(),
    watchAnswerQuestion(),
    watchDeleteQuestion(),
    watchLoadLocalStorageState()
  ]);
};
