import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import {
  Register,
  Login,
  MyProfile,
  DisplayProfile,
  TeamInfo,
  Teams,
  Chat,
  OrganiseHackathon,
  Hackathons,
  VideoCall,
} from './pages';
import { SocketProvider } from './contexts/SocketContext';
import { ChatProvider } from './contexts/ChatContext';
import { Navbar } from './components';
import { makeStyles } from '@mui/styles';
import './App.css';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  appContent: {
    display: 'flex',
    flexGrow: 1,
  },
});
export default function App() {
  const { userData } = useAuth();
  const classes = useStyles();
  const location = useLocation();
  console.log('Location', location);

  const AuthenticatedRoutes = () => {
    return (
      <Routes>
        <Route path='/' element={<h1>Welcome {userData.user.userName} </h1>} />
        <Route path='/profile' element={<MyProfile />} />
        <Route path='/profile/:userName' element={<DisplayProfile />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/teams' element={<Teams />} />
        <Route path='/teams/:teamId' element={<TeamInfo />} />
        <Route path='/organise-hackathon' element={<OrganiseHackathon />} />
        <Route path='/hackathons' element={<Hackathons />} />
        <Route
          path='/video-call/:videoRoomId/:channelName'
          element={<VideoCall />}
        />
      </Routes>
    );
  };
  const UnAuthenticatedRoutes = () => {
    return (
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    );
  };
  return (
    <div className={classes.root}>
      {!location.pathname.includes('/video-call') && <Navbar />}
      <div className={classes.appContent}>
        {userData.isLoggedIn ? (
          <SocketProvider>
            <ChatProvider>
              <AuthenticatedRoutes />
            </ChatProvider>
          </SocketProvider>
        ) : (
          <UnAuthenticatedRoutes />
        )}
      </div>
    </div>
  );
}
