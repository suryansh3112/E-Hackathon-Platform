import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { Register, Login } from './pages';
import { Navbar } from './components';

export default function App() {
  const { userData } = useAuth();
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          {userData.isLoggedIn ? (
            <>
              <h1>{userData?.user?.userName} dd</h1>
            </>
          ) : (
            <>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </>
          )}
        </Switch>
      </Router>
    </>
  );
}
