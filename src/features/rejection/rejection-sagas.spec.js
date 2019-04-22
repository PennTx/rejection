import { describe } from 'riteway';
import { call, put, select } from 'redux-saga/effects';

import reducer, { createQuestion, loadQuestions, getState } from './rejection-reducer';
import { loadLocalState, saveLocalState } from './rejection-sagas';
import { loadState, saveState } from '../../localStorage';

describe('rejection sagas', async assert => {
  {

    const gen = loadLocalState();

    assert({
      given: 'the loadLocalState saga',
      should: 'first call the loadState function',
      actual: gen.next().value,
      expected: call(loadState)
    });

    assert({
      given: 'the loadLocalState saga',
      should: 'then put the loadQuestions function with the loaded state',
      actual: gen.next().value,
      expected: put(loadQuestions(undefined))
    });

    assert({
      given: 'the loadLocalState saga',
      should: 'saga must be done',
      actual: gen.next(),
      expected: { done: true, value: undefined }
    });

  }

  {

    const gen = saveLocalState();

    assert({
      given: 'the saveLocalState saga',
      should: 'first select the state using the getState function',
      actual: gen.next().value,
      expected: select(getState)
    });

    assert({
      given: 'the saveLocalState saga',
      should: 'then call the saveState function with the selected state as a parameter',
      actual: gen.next().value,
      expected: call(saveState, undefined)
    });

    assert({
      given: 'the saveLocalState saga',
      should: 'saga must be done',
      actual: gen.next(),
      expected: { done: true, value: undefined }
    });

  }
});
