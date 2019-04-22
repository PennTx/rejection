import cuid from 'cuid';

export const createQuestion = ({ question, askee, status } = {}) => ({
  type: 'rejection-reducer/createQuestion',
  payload: {
    id: cuid(),
    timestamp: status !== 'Unanswered' ? Date.now() : null,
    question: question,
    askee: askee,
    status: status
  }
});

export const answerQuestion = ({ id, status } = {}) => ({
  type: 'rejection-reducer/answerQuestion',
  payload: {
    id,
    status
  }
});

export const deleteQuestion = ({ id } = {}) => ({
  type: 'rejection-reducer/deleteQuestion',
  payload: {
    id
  }
});

export const loadQuestions = (questions = []) => ({
  type: 'rejection-reducer/loadQuestions',
  payload: questions
});

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case createQuestion().type:
      return [...state, payload];
    case answerQuestion().type:
      return state.map(question => {
        if (question.id === payload.id) {
          return Object.assign({}, question, { status: payload.status });
        }
          return question;
      });
    case deleteQuestion().type:
      return state.filter(question => question.id !== payload.id);
    case loadQuestions().type:
      return state.concat(payload);
    default:
      return state;
  }
};

const getScore = state =>
    state.reduce(
      (accumulator, next) =>
        accumulator +
        (next.status === 'Rejected' ? 10 : next.status === 'Accepted' ? 1 : 0),
        0
    );

export { getScore };

export const getState = state => state;

