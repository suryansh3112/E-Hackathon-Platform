import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { Register, Login } from "./pages";
import { Navbar } from "./components";

export default function App() {
  const { userData } = useAuth();

  const AuthenticatedRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<h1>Welcome {userData.user.userName} </h1>} />
      </Routes>
    );
  };
  const UnAuthenticatedRoutes = () => {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    );
  };
  return (
    <>
      <Navbar />
      {userData.isLoggedIn ? (
        <AuthenticatedRoutes />
      ) : (
        <UnAuthenticatedRoutes />
      )}
    </>
  );
}
