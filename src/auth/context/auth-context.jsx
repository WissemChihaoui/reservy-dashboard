// src/auth/context/auth-context.jsx
import { createContext, useContext } from 'react';
import { ROLES } from '../roles';

export const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthConsumer = AuthContext.Consumer;