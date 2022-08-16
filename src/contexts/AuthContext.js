import React, { useContext, createContext, useState, useEffect } from 'react';
import api from '../utilits/api';
import Cookies from 'js-cookie';

export const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const isAuth = !!user;
  const refersh = Cookies.get('Refresh');

  useEffect(() => {
    const handle = setInterval(async () => {
      console.log(`refreshing token...`);
      authenticateRefresh();
    }, 60 * 60 * 1000);
    return () => clearInterval(handle);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!isAuth) {
      authenticateRefresh();
    }
    // eslint-disable-next-line
  }, []);

  const authenticateRefresh = async () => {
    try {
      await api.get('auth/refresh');
      const res = await api.post('users/me');
      setUser(res.data);
    } catch (e) {
      removeUserAndTokens();
      console.log(`no token found...`);
    }
  };

  const login = async data => {
    Cookies.set('Authentication', encodeURIComponent(data.Authentication), {
      expires: 1,
      path: '/',
      sameSite: 'None',
      Secure: true
    });

    Cookies.set('Refresh', encodeURIComponent(data.Refresh), {
      expires: 1,
      path: '/',
      sameSite: 'None',
      Secure: true
    });

    console.log(document.Cookie);

    try {
      const res = await api.post('users/me');
      setUser(res.data);
    } catch (e) {
      removeUserAndTokens();
      console.log(e);
    }
  };

  const logout = async () => {
    try {
      await api.post('auth/logout');
    } catch (e) {
      console.log(e);
    }
    removeUserAndTokens();
  };

  const removeUserAndTokens = () => {
    setUser(null);
    Cookies.remove('Authentication');
    Cookies.remove('Refresh');
  };

  return (
    <authContext.Provider
      value={{ isAuth, login, logout, user, authenticateRefresh }}
    >
      {children}
    </authContext.Provider>
  );
};

const useAuth = () => useContext(authContext);

export { AuthProvider, useAuth };
