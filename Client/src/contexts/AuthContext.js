import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "./SnackbarContext";
import Constants from "../common/Constants";

const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
    isLoggedIn: false,
  });

  const login = async (loginInfo) => {
    try {
      const res = await axios.post(`${Constants.server_url}/login`, loginInfo);
      setUserData({
        token: res.data.token,
        user: res.data.user,
        isLoggedIn: true,
      });

      localStorage.setItem("auth-token", res.data.token);

      showSnackbar(Constants.strings.loginSuccessfull);
      navigate("/");
    } catch (error) {
      const message =
        error?.response?.data?.message || Constants.strings.somethingWentWrong;
      showSnackbar(message, "error");
    }
  };

  const register = async (userInfo) => {
    try {
      await axios.post(`${Constants.server_url}/register`, userInfo);
      showSnackbar(Constants.strings.registerSuccessfull);
      navigate("/login");
    } catch (error) {
      const message =
        error?.response?.data?.message || Constants.strings.somethingWentWrong;
      showSnackbar(message, "error");
    }
  };

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
      isLoggedIn: false,
    });
    localStorage.setItem("auth-token", "");
    showSnackbar(Constants.strings.loggedOut);
    navigate("/login");
  };

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      const tokenRes = await axios.post(
        `${Constants.server_url}/tokenIsValid`,
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes?.data?.status) {
        setUserData({
          token,
          user: tokenRes?.data?.user,
          isLoggedIn: true,
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
