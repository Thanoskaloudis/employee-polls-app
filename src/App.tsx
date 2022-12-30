import React, { useEffect } from 'react';
import { Login } from './component/Login/Login';
import { authSelector } from './features/auth/authSlice';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { ResponsiveAppBar } from './component/ResponsiveAppBar/ResponsiveAppBar';
import { Route, Routes } from 'react-router';
import { Dashboard, Leaderboard, Poll } from '@mui/icons-material';
import { getUsersAsync } from './features/user/userSlice';
import './App.scss';

function App() {
  const auth = useAppSelector(authSelector);
  const dispatch = useAppDispatch();

  useEffect(()=> {
    if(auth.isAuthenticated) {
      dispatch(getUsersAsync());
    }

  },[auth.isAuthenticated, dispatch])

  if (!auth.isAuthenticated) {
    return (<Login/>);
  }

  return (
    <div className="app">
        {auth.isAuthenticated && <ResponsiveAppBar />}
        <Routes>
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
