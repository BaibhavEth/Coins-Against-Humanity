import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NicknamePage from './NicknamePage'; // Import the NicknamePage
import MultiplayerPage from './MultiplayerPage'; // Import the MultiplayerPage (previously App)
import PrivyLogin from './PrivyLogin'; // Import the PrivyLogin

const App = () => {
  const [nickname, setNickname] = useState('');
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<NicknamePage setNickname={setNickname} />} />
        <Route path="/game" element={<MultiplayerPage nickname={nickname} user={user} />} />
        <Route path="/login" element={<PrivyLogin setUser={setUser} />} />
      </Routes>
    </Router>
  );
};

export default App;
