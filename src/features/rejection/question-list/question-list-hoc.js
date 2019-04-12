import { connect } from 'react-redux';

import QuestionList from './question-list-component';
import { answerQuestion, deleteQuestion } from '../rejection-reducer';

const mapStateToProps = state => ({
  questions: state
});

const mapDispatchToProps = dispatch => ({
  handleToggleQuestionStatusClick: (id, status, event) =>
    dispatch(
     answerQuestion({
       id,
       status: (status === 'Accepted' ? 'Rejected' : status === 'Rejected' ? 'Unanswered' : 'Accepted' )
     })
    ),
  handleDeleteQuestionClick: (id, event) =>
    dispatch(
     deleteQuestion({
       id
     })
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);
