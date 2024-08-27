import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { usePrivy } from '@privy-io/react-auth';
import './App.css';

const socket = io('https://server.coinshumanity.com');

const MultiplayerPage = ({ nickname, user }) => {
  const [question, setQuestion] = useState('');
  const [yourAnswer, setYourAnswer] = useState('');
  const [submittedAnswers, setSubmittedAnswers] = useState([]);
  const [timer, setTimer] = useState(60);
  const [canDrawAnswer, setCanDrawAnswer] = useState(true);
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const { logout } = usePrivy();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('User info:', user); // Log user info to the console

    socket.on('question', (question) => {
      setQuestion(question);
      setYourAnswer('');
      setCanDrawAnswer(true);
      setAnswerRevealed(false);
    });

    socket.on('answers', (answers) => {
      setSubmittedAnswers(answers);
    });

    socket.on('timer', (time) => {
      setTimer(time);
      if (time === 0) {
        setCanDrawAnswer(false);
      }
    });

    // Request the current question when the component mounts
    console.log('Component mounted, requesting current question');
    socket.emit('request_current_question');

    // Handle the current question response
    socket.on('current_question', (currentQuestion) => {
      console.log('Received current question:', currentQuestion);
      setQuestion(currentQuestion);
    });

    return () => {
      socket.off('question');
      socket.off('answers');
      socket.off('timer');
      socket.off('current_question');
    };
  }, [user]);

  const handleAnswerSelect = () => {
    if (canDrawAnswer) {
      const answers = [
        "Airdropping meme coins to Congress members.",
        "Elon Musk's Dogecoin-powered spaceship.",
        "The SEC's new mascot: Crypto Kitty."
      ];
      const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
      const submittedAnswer = { answer: randomAnswer, nickname };

      console.log('Submitting answer:', submittedAnswer);
      setYourAnswer(randomAnswer);
      socket.emit('submit_answer', submittedAnswer);
      setCanDrawAnswer(false);
      setAnswerRevealed(true);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="game-container">
      <h1>Coins Against Humanity - Multiplayer</h1>

      <div className="user-info">
        {user ? (
          <>
            <img src={user.farcaster.pfp} alt={user.name} className="user-picture" />
            <p>{user.farcaster.username}</p>
            <br/>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </>
        ) : (
          <button onClick={() => navigate('/login')} className="logout-button">Login</button>
        )}
      </div>

      <div className="card-section">
        <div className="card prompt-card">
          <p>{question || 'Waiting for prompt...'}</p>
        </div>
        <div
          id="answerCard"
          className="card answer-card"
          onClick={handleAnswerSelect}
        >
          <p id="answer">{yourAnswer || 'Click to reveal answer...'}</p>
          <br></br>
          <br></br>
          <br></br>
          {!canDrawAnswer && <p className="timer-text">Can't draw card for {timer} seconds</p>}
        </div>
      </div>

      <div className="footer">
        <p>Multiplayer Answers</p>
        <div className="submitted-answers">
          {submittedAnswers.length > 0 ? (
            submittedAnswers.map((item, index) => (
              <div className="submitted-answer-card" key={index}>
                <p className="answer-text">{item.answer}</p>
                <div className="answer-meta">
                  <span className="answer-author">— {item.nickname}</span>
                  <button className="share-button">Share</button>
                </div>
              </div>
            ))
          ) : (
            <p>No answers submitted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiplayerPage;