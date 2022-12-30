import { Alert, Avatar, Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { generatePath, useNavigate } from 'react-router-dom';
import { authUserSelector } from '../../features/auth/authSlice';
import { pollSelector, storeQuestionAsync } from '../../features/poll/pollSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './Poll.scss';

export const Poll = () => {
  const dispatch = useAppDispatch();
    const authUser = useAppSelector(authUserSelector)!;
    const poll = useAppSelector(pollSelector);
    const [missingFields, setMissingFields] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const optionOneText = data.get('optionOneText');
        const optionTwoText = data.get('optionTwoText');

        if (!(optionOneText && optionTwoText)) {
            setMissingFields(true);
            return;
        }

        setMissingFields(false);

        dispatch(storeQuestionAsync({
            author: authUser.id,
            optionOneText: optionOneText as string,
            optionTwoText: optionTwoText as string,
        })).then(() => {
            navigate(generatePath('/'));
        });
    };

    return (
      <div className="poll">
        <Typography variant="h4" component="div" gutterBottom>
          Add Question
        </Typography>
        <Avatar alt={authUser!.name || undefined} src={authUser!.avatarURL || undefined} />
        <Typography sx={{fontWeight: 'bold', mb: '1rem'}}>{authUser.name}</Typography>
        <Typography variant="subtitle1" component="div" gutterBottom>
          Would You Rather
        </Typography>
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Box sx={{display: 'flex'}}>
              <Box sx={{margin: '1rem'}}>
                  <TextField fullWidth label="Option One" name="optionOneText"/>
                </Box>
                <Box sx={{margin: '1rem'}}>
                  <TextField fullWidth label="Option Two" name="optionTwoText"/>
                </Box>
              </Box>
                <Box>
                    {poll.status === 'failed' && (
                      <Alert severity="error">
                          The question was not created.
                      </Alert>
                    )}

                    {missingFields && (
                      <Alert severity="warning">
                          All fields are required.
                      </Alert>
                    )}
                </Box>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{width: '10rem', mt: 3, mb: 2}}>
                    Submit
                </Button>
            </Box>
      </div>
    );
}
