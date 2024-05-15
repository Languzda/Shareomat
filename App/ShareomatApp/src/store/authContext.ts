import {createContext} from 'react';

export type authContextType = {
  token: string;
  userId: string;
  onLogin: (token: string, userId: string) => void;
  onLogout: () => void;
  isAuthenticated: boolean;
};
export const AuthContext = createContext({
  token: '',
  userId: '',
  onLogin: (token: string, userId: string) => {},
  onLogout: () => {},
  isAuthenticated: false,
});
