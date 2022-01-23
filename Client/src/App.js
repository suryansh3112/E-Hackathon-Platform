import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import {
  Register,
  Login,
  MyProfile,
  DisplayProfile,
  TeamInfo,
  Teams,
  Chat,
} from "./pages";
import { Navbar } from "./components";
import { makeStyles } from "@mui/styles";
import "./App.css";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  appContent: {
    display: "flex",
    flexGrow: 1,
  },
});
export default function App() {
  const { userData } = useAuth();
  const classes = useStyles();

  const AuthenticatedRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<h1>Welcome {userData.user.userName} </h1>} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/profile/:userName" element={<DisplayProfile />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/teams/:teamId" element={<TeamInfo />} />
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
    <div className={classes.root}>
      <Navbar />
      <div className={classes.appContent}>
        {userData.isLoggedIn ? (
          <AuthenticatedRoutes />
        ) : (
          <UnAuthenticatedRoutes />
        )}
      </div>
    </div>
  );
}
