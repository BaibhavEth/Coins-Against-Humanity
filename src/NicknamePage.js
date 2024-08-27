import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NicknamePage = ({ setNickname }) => {
  const [inputNickname, setInputNickname] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (inputNickname.trim()) {
      setNickname(inputNickname.trim());
      navigate('/game'); // Navigate to the multiplayer page
    } else {
      console.log('Nickname input is empty'); // Log if the input is empty
    }
  };

  return (
    <div className="nickname-container">
      <h2>Select Your Nickname</h2>
      <input
        type="text"
        value={inputNickname}
        onChange={(e) => setInputNickname(e.target.value)}
        placeholder="Enter your nickname"
        style={{ padding: '10px', fontSize: '16px' }}
      />
      <button
        onClick={handleSubmit}
        style={{ padding: '10px 20px', fontSize: '16px', marginTop: '10px' }}
      >
        Submit
      </button>
    </div>
  );
};

export default NicknamePage;
