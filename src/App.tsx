import React, { useEffect } from 'react';
import { Login } from './component/Login/Login';
import { authSelector } from './features/auth/authSlice';
import { useAppSelector } from './store/hooks';
import { ResponsiveAppBar } from './component/ResponsiveAppBar/ResponsiveAppBar';
import { Route, Routes, useNavigate } from 'react-router';
import { Dashboard, Leaderboard, Poll } from '@mui/icons-material';
import './App.scss';

function App() {
  const auth = useAppSelector(authSelector);
  const navigate = useNavigate();

  useEffect(()=> {
    if(auth.isAuthenticated) {
      navigate("/");
    } else {
      navigate("/login");
    }
  },[auth.isAuthenticated, navigate])

  return (
    <div className="app">
        {auth.isAuthenticated && <ResponsiveAppBar />}
        <Routes>
        <Route
            path="/login"
            element={<Login />}
          />
        <Route
            path="/leaderboard"
            element={<Leaderboard />}
          />
          <Route
            path="/"
            element={<Dashboard />}
          />
          <Route
            path="/answered"
            element={<Poll />}
          />
          <Route
            path="/polls/:question"
            element={<Poll />}
          />
        </Routes>
    </div>
  );
}

export default App;
