import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Constants from "../common/Constants";

const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const navigate = useNavigate();

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

      alert("Login Successfull.");
      navigate("/");
    } catch (error) {
      alert("Something went wrong,Please try again.");
      console.log("error", error);
    }
  };

  const register = async (userInfo) => {
    try {
      await axios.post(`${Constants.server_url}/register`, userInfo);
      alert("Registered Successfully.");
      navigate("/login");
    } catch (error) {
      alert("Something went wrong,Please try again.");
      console.log("error", error.message);
    }
  };

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
      isLoggedIn: false,
    });
    localStorage.setItem("auth-token", "");
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
