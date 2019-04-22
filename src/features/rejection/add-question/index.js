import { connect } from 'react-redux';

import AddQuestion from './add-question-component';
import { createQuestion } from '../rejection-reducer';

const mapDispatchToProps = dispatch => ({
  handleAcceptedClick: (questionRef, askeeRef) => dispatch(
    createQuestion({
      question: questionRef.current.value,
      askee: askeeRef.current.value,
      status: 'Accepted'
    })
  ),
  handleRejectedClick: (questionRef, askeeRef) => dispatch(
    createQuestion({
      question: questionRef.current.value,
      askee: askeeRef.current.value,
      status: 'Rejected'
    })
  ),
  handleUnansweredClick: (questionRef, askeeRef) => dispatch(
    createQuestion({
      question: questionRef.current.value,
      askee: askeeRef.current.value,
      status: 'Unanswered'
    })
  )
});

export default connect(null, mapDispatchToProps)(AddQuestion);
