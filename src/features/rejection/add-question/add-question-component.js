import React, { useRef } from 'react';

const AddQuestion = ({ handleAcceptedClick, handleRejectedClick, handleUnansweredClick }) => {
  const questionRef = useRef();
  const askeeRef = useRef();
  return (
    <div className="add-question">
      <label htmlFor="question-input">Question:</label><input className="question" id="question-input" ref={questionRef} />
      <label htmlFor="askee-input">Askee:</label><input className="askee" id="askee-input" ref={askeeRef} />
      <button type="button" className="accepted" onClick={() => handleAcceptedClick(questionRef, askeeRef)}>Accepted</button>
      <button type="button" className="rejected" onClick={() => handleRejectedClick(questionRef, askeeRef)}>Rejected</button>
      <button type="button" className="unanswered" onClick={() => handleUnansweredClick(questionRef, askeeRef)}>Unanswered</button>
    </div>
  );
}

export default AddQuestion;

