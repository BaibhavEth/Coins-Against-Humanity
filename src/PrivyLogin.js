import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePrivy } from '@privy-io/react-auth';

const PrivyLogin = ({ setUser }) => {
  const navigate = useNavigate();
  const { login, user } = usePrivy();

  useEffect(() => {
    const handleLogin = async () => {
      try {
        await login();
        setUser(user);
        navigate('/game');
      } catch (error) {
        console.error('Login failed:', error);
      }
    };

    handleLogin();
  }, [login, navigate, setUser, user]);

  return <div>Loading...</div>;
};

export default PrivyLogin;