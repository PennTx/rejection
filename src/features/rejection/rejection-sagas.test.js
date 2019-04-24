import { describe } from 'riteway';
import { call, put, select } from 'redux-saga/effects';

import reducer, { createQuestion, loadQuestions, getState } from './rejection-reducer';
import { loadLocalState, saveLocalState } from './rejection-sagas';
import { loadState, saveState } from '../../localStorage';

describe('rejection saga - loadLocalState (no state to load)', async assert => {
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
      should: 'then put the loadQuestions function with the loaded state (initial load, no state to load)',
      actual: gen.next(undefined).value,
      expected: put(loadQuestions())
    });

    assert({
      given: 'the loadLocalState saga',
      should: 'now be done',
      actual: gen.next(),
      expected: { done: true, value: undefined }
    });

  }

});

describe('rejection saga - loadLocalState (saved state to load)', async assert => {
  {

    const gen = loadLocalState();
    const questionOne = {
      question: 'May I have a raise?',
      askee: 'Boss',
      status: 'Rejected'
    };
    const questionTwo = {
      question: 'Can you pass the salt?',
      askee: 'Other',
      status: 'Accepted'
    };
    const state = [questionOne, questionTwo].map(question => createQuestion(question)).reduce(reducer, reducer());
 

    assert({
      given: 'the loadLocalState saga',
      should: 'first call the loadState function',
      actual: gen.next().value,
      expected: call(loadState)
    });

    assert({
      given: 'the loadLocalState saga',
      should: 'then put the loadQuestions function with the loaded state (subsequent load, state to load)',
      actual: gen.next(state).value,
      expected: put(loadQuestions(state))
    });

    assert({
      given: 'the loadLocalState saga',
      should: 'now be done',
      actual: gen.next(),
      expected: { done: true, value: undefined }
    });

  }
});

describe('rejection saga - saveLocalState (state to save)', async assert => {
  {

    const gen = saveLocalState();
    const questionOne = {
      question: 'May I have a raise?',
      askee: 'Boss',
      status: 'Rejected'
    };
    const questionTwo = {
      question: 'Can you pass the salt?',
      askee: 'Other',
      status: 'Accepted'
    };
    const state = [questionOne, questionTwo].map(question => createQuestion(question)).reduce(reducer, reducer());
 
    assert({
      given: 'the saveLocalState saga',
      should: 'first select the state using the getState function',
      actual: gen.next().value,
      expected: select(getState)
    });

    assert({
      given: 'the saveLocalState saga',
      should: 'then call the saveState function with the selected state as a parameter',
      actual: gen.next(state).value,
      expected: call(saveState, state)
    });

    assert({
      given: 'the saveLocalState saga',
      should: 'now be done',
      actual: gen.next(),
      expected: { done: true, value: undefined }
    });

  }
});
