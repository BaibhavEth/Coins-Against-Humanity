import React from 'react';

const AnswerSelection = ({ answerDeck, onAnswerSelect }) => (
  <div>
    <h3>Select your answer:</h3>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
      {answerDeck.map((answer, index) => (
        <button key={index} onClick={() => onAnswerSelect(answer)}>
          {answer}
        </button>
      ))}
    </div>
  </div>
);

export default AnswerSelection;
