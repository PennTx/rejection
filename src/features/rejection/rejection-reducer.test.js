import React from 'react';
import { describe } from 'riteway';

import reducer, { createQuestion, answerQuestion, deleteQuestion, loadQuestions, getScore, getState } from './rejection-reducer';

const getObjectFromQuestion = () => ({ question, askee, status }) => ({
    question,
    askee,
    status
});

/*
5 Questions Every Unit Test Must Answer
1. What are we testing? (component, etc)
2. What behavior are we testing (in prose)
3. What is the actual output?
4. What is the expected output?
5. How can we reproduce the failure?
*/
describe('rejection reducer', async assert => {
  assert({
    given: 'no arguments',
    should: 'return the valid default state',
    actual: reducer(),
    expected: []
  });

  {
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
    const state = [];

    assert({
      given: 'create question action',
      should: 'add new question to the state',
      actual: reducer(undefined, createQuestion(questionOne)).map(getObjectFromQuestion()),
      expected: [questionOne]
    });

    reducer(state, createQuestion(questionOne));
    assert({
      given: 'create question action',
      should: 'add new question to the state without modifying the state',
      actual: state,
      expected: []
    });

    assert({
      given: 'two create question actions',
      should: 'add more than one question to the state',
      actual: [questionOne, questionTwo].map(question => createQuestion(question)).reduce(reducer, reducer()).map(getObjectFromQuestion()),
      expected: [questionOne, questionTwo]
    });

    assert({
      given: 'an answer question action',
      should: 'change the answer to only one question',
      actual: [questionOne, questionTwo]
        .map(question => createQuestion(question))
        .reduce(reducer, reducer())
        .flatMap(question => reducer([question], (question.question === questionOne.question ? answerQuestion({ id: question.id, status: 'Accepted' }) : {})))
        .map(getObjectFromQuestion()),
      expected: [Object.assign({}, questionOne, { status: 'Accepted' }), questionTwo]
    });

    assert({
      given: 'a delete question action',
      should: 'delete only one answer from the state',
      actual: [questionOne, questionTwo]
        .map(question => createQuestion(question))
        .reduce(reducer, reducer())
        .flatMap(question => reducer([question], (question.question === questionOne.question ? deleteQuestion({ id: question.id }) : {})))
        .map(getObjectFromQuestion()),
      expected: [questionTwo]
    });

    {
      const localState = [questionOne, questionTwo]
        .map(question => createQuestion(question))
        .reduce(reducer, reducer())

      assert({
        given: 'a load questions action',
        should: 'load all the input questions into the reduced state',
        actual: reducer(undefined, loadQuestions(localState)),
        expected: localState
      });

    }

  }

});

describe('rejection reducer getScore', async assert => {
  const actions = [
    createQuestion({
      question: 'May I have a raise?',
      askee: 'Boss',
      status: 'Rejected'
    }),
    createQuestion({
      question: 'May I have a raise?',
      askee: 'Boss',
      status: 'Rejected'
    }),
    createQuestion({
      question: 'May I have a raise?',
      askee: 'Boss',
      status: 'Accepted'
    })
  ];
  const initialState = actions.reduce(reducer, reducer());
  const actual = getScore(initialState);

  assert({
    given: 'questions in state',
    should: 'tally the score',
    actual,
    expected: 21
  });
});

describe('rejection reducer getState', async assert => {
  const actions = [
    createQuestion({
      question: 'May I have a raise?',
      askee: 'Boss',
      status: 'Rejected'
    }),
    createQuestion({
      question: 'May I have a raise?',
      askee: 'Boss',
      status: 'Rejected'
    }),
    createQuestion({
      question: 'May I have a raise?',
      askee: 'Boss',
      status: 'Accepted'
    })
  ];
  const initialState = actions.reduce(reducer, reducer());
  const actual = getState(initialState);

  assert({
    given: 'questions in state',
    should: 'return all questions',
    actual,
    expected: initialState 
  });
});

