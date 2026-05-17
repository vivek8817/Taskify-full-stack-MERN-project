// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type{ UserPayload } from '../api/auth';

interface AuthContextType {
  user: UserPayload | null;
  login: (userData: UserPayload) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    
  const [user, setUser] = useState<UserPayload | null>(null);

  // App load hone par localStorage se user check karo
  useEffect(() => {
    const storedUser = localStorage.getItem('taskify_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: UserPayload) => {
    setUser(userData);
    localStorage.setItem('taskify_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('taskify_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook banate hain taaki components mein use karna asaan ho
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};