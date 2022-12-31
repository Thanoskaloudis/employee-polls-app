import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect } from 'react';
import { authUserSelector } from '../../features/auth/authSlice';
import { getQuestionsAsync } from '../../features/poll/pollSlice';
import { getUsersAsync, leaderSelector } from '../../features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './Leaderboard.scss';

export const Leaderboard = () => {
  const dispatch = useAppDispatch();
  const leaders = useAppSelector(leaderSelector);
  const authUser = useAppSelector(authUserSelector);

  useEffect(()=> {
    dispatch(getQuestionsAsync());
    dispatch(getUsersAsync());
  },[dispatch])

  return (
    <div className="leaderboard">
        <Typography variant="h4" component="div" gutterBottom sx={{textAlign: 'center'}}>
          Leaderboard
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ bgcolor: '#efefef' }}>
              <TableCell>Users</TableCell>
              <TableCell align="center">Answered</TableCell>
              <TableCell align="center">Questions</TableCell>
              <TableCell align="center">Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaders.map((leader) => (
              <TableRow
                key={leader.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0}, bgcolor: `${leader.id === authUser!.id && '#dbf9ff'}` }}
              >
                <TableCell component="th" scope="row">
                  {leader.name}
                </TableCell>
                <TableCell align="center">{Object.keys(leader.answers).length}</TableCell>
                <TableCell align="center">{leader.questions.length}</TableCell>
                <TableCell align="center">{leader.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
