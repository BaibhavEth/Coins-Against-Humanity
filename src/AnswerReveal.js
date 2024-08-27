import React from 'react';

const AnswerReveal = ({ selectedAnswers }) => (
  <div>
    <h3>Selected Answers:</h3>
    <ul>
      {selectedAnswers.map((answer, index) => (
        <li key={index}>{answer}</li>
      ))}
    </ul>
  </div>
);

export default AnswerReveal;
