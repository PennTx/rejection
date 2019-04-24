import { connect } from 'react-redux';

import AddQuestion from './add-question-component';
import { createQuestion } from '../rejection-reducer';

const mapDispatchToProps = {
  handleAcceptedClick: (questionRef, askeeRef) =>
    createQuestion({
      question: questionRef.current.value,
      askee: askeeRef.current.value,
      status: 'Accepted'
    }),
  handleRejectedClick: (questionRef, askeeRef) =>
    createQuestion({
      question: questionRef.current.value,
      askee: askeeRef.current.value,
      status: 'Rejected'
    }),
  handleUnansweredClick: (questionRef, askeeRef) =>
    createQuestion({
      question: questionRef.current.value,
      askee: askeeRef.current.value,
      status: 'Unanswered'
    })
};

export default connect(null, mapDispatchToProps)(AddQuestion);
