import { Avatar, Box, Button, Card, CardContent, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useParams } from 'react-router';
import { authSelector, authUserSelector } from '../../features/auth/authSlice';
import { pollSelector, storeAnswerAsync } from '../../features/poll/pollSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getStatsForQuestion, getValueForQuestion } from '../../utils/func.helper';
import { questionOptions, Question } from '../../utils/models';
import './Poll.scss';

export const Poll = () => {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(authUserSelector)!;
  const poll = useAppSelector(pollSelector);
  const auth = useAppSelector(authSelector);
  const [value, setValue] = useState('');
  
  let {question: id}: { question?: string | null } = useParams<"question">();
  const question: Question | null = id ? poll.questions.byId[id] : null;

  const stats = getStatsForQuestion(question!);

  const existingValue = getValueForQuestion(question!, auth.userId!);
  const currentValue = existingValue || value;

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
    }));
  };       

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (existingValue) {
        return;
    }

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
                                disabled={!!existingValue}
                            />
                            <FormControlLabel
                                value={questionOptions.optionTwo}
                                control={<Radio/>}
                                label={question!.optionTwo.text}
                                disabled={!!existingValue}
                            />
                        </RadioGroup>
                        <FormHelperText>
                            {existingValue ? '' : 'Stats will appear when picking an option here...'}
                        </FormHelperText>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{width: '10rem', mt: 3}}
                            disabled={!!existingValue}
                            >
                            Submit
                        </Button>
                    </FormControl>
                </Box>
             </CardContent>
             {existingValue && (
                <Card title="Stats" sx={{marginTop: 2}}>
                    <CardContent>
                        <Typography variant="h5" component="div" gutterBottom>
                            Stats
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <b>{stats.oneN}({stats.oneP}%)</b> users
                            prefer <b>{question!.optionOne.text}</b>,
                            <br/>
                            while the
                            remaining <b>{stats.twoN}({stats.twoP}%)</b> prefer <b>{question!.optionTwo.text}</b>.
                        </Typography>
                    </CardContent>
                </Card>
            )}
        </Box>
      </div>
  )
}
