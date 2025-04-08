import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [gId, setGId] = useState(null);

  const login = (g_id) => {
    setGId(g_id);
  };

  const logout = () => {
    setGId(null);
  };

  return (
    <AuthContext.Provider value={{ gId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
