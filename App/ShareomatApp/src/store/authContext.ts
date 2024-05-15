import {createContext} from 'react';

export type authContextType = {
  token: string;
  userId: string;
  login: (token: string, userId: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
};
export const AuthContext = createContext({
  token: '',
  userId: '',
  login: (token: string, userId: string) => {},
  logout: () => {},
  isAuthenticated: false,
});
