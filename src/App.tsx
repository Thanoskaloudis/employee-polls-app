import React, { useEffect } from 'react';
import { Login } from './component/Login/Login';
import { authSelector } from './features/auth/authSlice';
import { useAppDispatch, useAppSelector } from './store/hooks';
import './App.scss';

function App() {
  const auth = useAppSelector(authSelector);

  return (
    <div className="app">
      {!auth.isAuthenticated ? <Login /> : <h1>Logged in</h1>}
    </div>
  );
}

export default App;
