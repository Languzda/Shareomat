import {PropsWithChildren, ReactNode, useState} from 'react';
import {AuthContext, authContextType} from './authContext.ts';

const AuthContextProvider = ( {children} : PropsWithChildren ) => {
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function handleLogin(token: string, userId: string) {
    setToken(token);
    setUserId(userId);
    setIsAuthenticated(true);
  }

  function handleLogout() {
    setToken('');
    setUserId('');
    setIsAuthenticated(false);
  }

  const authContext: authContextType = {
    token: token,
    userId: userId,
    onLogin: handleLogin,
    onLogout: handleLogout,
    isAuthenticated: isAuthenticated,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
