import React from 'react';
import { Login } from './component/Login/Login';
import { authSelector } from './features/auth/authSlice';
import { useAppSelector } from './store/hooks';
import { AppWrapper } from './component/AppWrapper/AppWrapper';
import './App.scss';

function App() {
  const auth = useAppSelector(authSelector);

  return (
    <div className="app">
      {!auth.isAuthenticated ?
        <Login />
        : 
        <AppWrapper />
      }
    </div>
  );
}

export default App;
