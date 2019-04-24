import { connect } from 'react-redux';

import QuestionList from './question-list-component';
import { answerQuestion, deleteQuestion } from '../rejection-reducer';

const mapStateToProps = state => ({
  questions: state
});

const mapDispatchToProps = {
  handleToggleQuestionStatusClick: (id, status, event) =>
    answerQuestion({
      id,
      status: (status === 'Accepted' ? 'Rejected' : status === 'Rejected' ? 'Unanswered' : 'Accepted' )
    }),
  handleDeleteQuestionClick: (id, event) =>
    deleteQuestion({
      id
    })
};


export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);
