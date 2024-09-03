import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NicknamePage from './NicknamePage'; // Import the NicknamePage
import MultiplayerPage from './MultiplayerPage'; // Import the MultiplayerPage (previously App)

const App = () => {
  const [nickname, setNickname] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<NicknamePage setNickname={setNickname} />} />
        <Route path="/game" element={<MultiplayerPage nickname={nickname} />} />
      </Routes>
    </Router>
  );
};

export default App;
