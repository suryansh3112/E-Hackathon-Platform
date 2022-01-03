import React, { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const history = useHistory();
  console.log(history);

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
    isLoggedIn: false
  });

  const login = async (loginInfo) => {
    console.log('login', loginInfo);
    try {
      const res = await axios.post('http://localhost:5000/login', loginInfo);
      setUserData({
        token: res.data.token,
        user: res.data.user,
        isLoggedIn: true
      });

      localStorage.setItem('auth-token', res.data.token);

      alert('Login Successfull.');
    } catch (error) {
      alert('Something went wrong,Please try again.');
      console.log('error', error);
    }
  };

  const register = async (userInfo, callback) => {
    console.log('register', userInfo);
    try {
      await axios.post('http://localhost:5000/register', userInfo);
      alert('Registered Successfully.');
      callback();
    } catch (error) {
      alert('Something went wrong,Please try again.');
      console.log('error', error);
    }
  };

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
      isLoggedIn: false
    });
    localStorage.setItem('auth-token', '');
  };

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');
      console.log('token', token);
      const tokenRes = await axios.post(
        `http://localhost:5000/tokenIsValid`,
        null,
        { headers: { 'x-auth-token': token } }
      );
      if (tokenRes?.data?.status) {
        setUserData({
          token,
          user: tokenRes?.data?.user,
          isLoggedIn: true
        });
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, register, userData }}>
      {children}
    </AuthContext.Provider>
  );
}
