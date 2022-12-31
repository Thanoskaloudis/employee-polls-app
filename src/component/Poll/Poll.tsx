import { Avatar, Box, Button, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { authSelector, authUserSelector } from '../../features/auth/authSlice';
import { pollSelector, storeAnswerAsync } from '../../features/poll/pollSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { questionOptions, Question } from '../../utils/models';
import './Poll.scss';

export const Poll = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authUser = useAppSelector(authUserSelector)!;
  const poll = useAppSelector(pollSelector);
  const auth = useAppSelector(authSelector);
  
  let {question: id}: { question?: string | null } = useParams<"question">();
  const question: Question | null = id ? poll.questions.byId[id] : null;

  const [value, setValue] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const value = data.get('value');
    if (!value) {
        return;
    }

    dispatch(storeAnswerAsync({
        userId: auth.userId!,
        questionId: question!.id,
        answer: questionOptions[value as keyof typeof questionOptions]
    })).finally(() => navigate('/'));
  };        

  const currentValue = value;

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.currentTarget.value);
  }

  return (
      <div className="poll">
        <Typography variant="h4" component="div" gutterBottom>
          Poll by
        </Typography>
        <Avatar alt={authUser!.name || undefined} src={authUser!.avatarURL || undefined} />
        <Typography sx={{fontWeight: 'bold', mb: '1rem'}}>{authUser.name}</Typography>
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <CardContent sx={{flex: '1 0 auto'}}>
                <Box component="form" onSubmit={handleSubmit}>
                    <FormControl
                        sx={{m: 3, display: 'flex', alignItems: 'center'}}
                        component="fieldset"
                        variant="standard"
                    >
                        <FormLabel component="legend">Would you rather...</FormLabel>
                        <RadioGroup
                            name="value"
                            value={currentValue}
                            onChange={handleValueChange}
                        >
                             <FormControlLabel
                                value={questionOptions.optionOne}
                                control={<Radio/>}
                                label={question!.optionOne.text}
                            />
                            <FormControlLabel
                                value={questionOptions.optionTwo}
                                control={<Radio/>}
                                label={question!.optionTwo.text}
                            />
                        </RadioGroup>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{width: '10rem', mt: 3}}
                            >
                            Submit
                        </Button>
                    </FormControl>
                </Box>
             </CardContent>
        </Box>
      </div>
  )
}
