import { useEffect } from 'react';
import { Login } from './component/Login/Login';
import { authSelector, authUserSelector } from './features/auth/authSlice';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { ResponsiveAppBar } from './component/ResponsiveAppBar/ResponsiveAppBar';
import { Route, Routes } from 'react-router';
import { getUsersAsync } from './features/user/userSlice';
import { getQuestionsAsync, pollSelector } from './features/poll/pollSlice';
import { Leaderboard } from './component/Leaderboard/Leaderboard';
import { Dashboard } from './component/Dashboard/Dashboard';
import { NewPoll } from './component/NewPoll/NewPoll';
import { CircularProgress } from '@mui/material';
import { Poll } from './component/Poll/Poll';
import { PageNotFound } from './component/PageNotFound/PageNotFound';
import { Navigate } from 'react-router-dom';
import './App.scss';

function App() {
  const auth = useAppSelector(authSelector);
  const poll = useAppSelector(pollSelector);
  const authUser = useAppSelector(authUserSelector);
  const dispatch = useAppDispatch();

  useEffect(()=> {
    if(auth.isAuthenticated) {
        dispatch(getUsersAsync());
        dispatch(getQuestionsAsync());
    }

  },[auth.isAuthenticated, dispatch])

  if (!auth.isAuthenticated) {
    return (<Login />);
  }

  if (!authUser && poll.status==='loading') {
    return (
      <div className="app">
      <ResponsiveAppBar />
      <div className="app__progress"><CircularProgress/></div>
    </div>
    )
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
            path="/questions/:question"
            element={(<Poll />)}
          />
          <Route
            path="/add"
            element={<NewPoll />}
          />
          <Route 
            path="/404"
            element={<PageNotFound />} 
          />
          <Route  
            path="*" 
            element={<Navigate to="/404" replace />}
          />
        </Routes>
    </div>
  );
}

export default App;
