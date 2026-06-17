import { createContext, useContext, useState, useEffect } from 'react';
import { getCollection, setStore, getStore } from '../data/store';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = getStore('currentUser');
    if (saved) setUser(saved);
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = getCollection('users');
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) return { error: 'Email ou senha inválidos' };
    setStore('currentUser', found);
    setUser(found);
    return { success: true, user: found };
  };

  const logout = () => {
    removeStore('currentUser');
    setUser(null);
  };

  const register = (data) => {
    const users = getCollection('users');
    if (users.find(u => u.email === data.email)) return { error: 'Email já registado' };
    const newUser = {
      ...data,
      id: Date.now(),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`,
      createdAt: Date.now(),
    };
    users.push(newUser);
    setStore('users', users);
    setStore('currentUser', newUser);
    setUser(newUser);
    return { success: true, user: newUser };
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}

function removeStore(key) {
  localStorage.removeItem('ceids_' + key);
}
