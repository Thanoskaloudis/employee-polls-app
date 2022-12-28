import React, { useEffect } from 'react';
import { Login } from './component/Login/Login';
import { authSelector } from './features/auth/authSlice';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { Route, Routes } from 'react-router-dom';
import { Dashboard } from './component/Dashboard/Dashboard';
import { Leaderboard } from './component/Leaderboard/Leaderboard';
import { Poll } from './component/Poll/Poll';
import './App.scss';

function App() {
  const auth = useAppSelector(authSelector);

  return (
    <div className="app">
      {!auth.isAuthenticated ? (
        <Login />
      ) : (
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
      )}
    </div>
  );
}

export default App;
