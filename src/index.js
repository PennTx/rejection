import React from 'react';

import rejection, { createQuestion, answerQuestion, deleteQuestion, getScore } from './features/rejection/rejection-reducer';
import Score from './features/rejection/score/score-hoc';
import AddQuestion from './features/rejection/add-question/add-question-hoc';
import QuestionList from './features/rejection/question-list/question-list-hoc';

function App() {

  return (
    <div>
      <Score />
      <AddQuestion />
      <QuestionList />
      <style global jsx>{`
        .add-question {
          display: flex;
          flex-flow: column wrap;
          align-items: flex-center;
          max-width: 20em;
        }
        .add-question button {
          align-self: center;
          flex: 0 0 2em;
          margin: .5em 0;
        }
        body {
          margin: 0;
          padding: 0;
          font-family: sans-serif;
        }
        dt {
          font-weight: bold;
        }
        button {
          max-width: 15em;
        }
        ul {
          list-style-type: none;
          display: flex;
          flex-flow: row wrap;
        }
        ul li {
          border-radius: 1em;
          box-shadow: 0 0 .5em .5em rgba(0, 0, 0, 0.5);
          margin: 1em 2em;
          padding: 1em;
        }
        li.question button {
          width: 100%;
        }
      `}</style>
    </div>
  );
}

export default App;
