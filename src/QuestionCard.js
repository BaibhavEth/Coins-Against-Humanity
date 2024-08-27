const QuestionCard = ({ question, timer }) => {
    console.log('Rendering QuestionCard with:', question, timer);
    return (
      <div>
        <h2>{question}</h2>
        <p>Time remaining: {timer} seconds</p>
      </div>
    );
  };
  
  export default QuestionCard;
  