import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { authUserSelector } from '../../features/auth/authSlice';
import { getQuestionsAsync, pollSelector } from '../../features/poll/pollSlice';
import { getUsersAsync, userSelector } from '../../features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Question, QuestionWithAuthor } from '../../utils/models';
import { QuestionList } from '../QuestionList/QuestionList';
import './Dashboard.scss';

export const Dashboard = () => {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(authUserSelector);
  const poll = useAppSelector(pollSelector);
  const user = useAppSelector(userSelector);
  const answeredQuestionIds = Object.keys(authUser!.answers);

  useEffect(()=> {
    dispatch(getQuestionsAsync());
    dispatch(getUsersAsync());
  },[dispatch])

  const newQuestionFilter = (answeredQuestionIds: Array<string>) => (id: string) => !answeredQuestionIds.includes(id);
  const newQuestionIds = poll.questions.allIds.filter(newQuestionFilter(answeredQuestionIds));

  const answeredQuestionFilter = (answeredQuestionIds: Array<string>) =>(id: string) => answeredQuestionIds.includes(id);
  const doneQuestionIds = poll.questions.allIds.filter(answeredQuestionFilter(answeredQuestionIds));

  const newQuestionsWithAuthors = newQuestionIds.map((id: string): QuestionWithAuthor => {
    const question: Question = poll.questions.byId[id];

    return {
        ...question,
        authorObject: user.users.byId[question.author],
    };
  });

  const doneQuestionsWithAuthors = doneQuestionIds.map((id: string): QuestionWithAuthor => {
    const question: Question = poll.questions.byId[id];

    return {
        ...question,
        authorObject: user.users.byId[question.author],
    };
  });

  console.log(newQuestionsWithAuthors, doneQuestionsWithAuthors)
  
  return (
    <div className="dashboard">
      <div className="dashboard__item">
        <Typography variant="h4" component="div" gutterBottom sx={{textAlign: 'center'}}>
          New Questions
        </Typography>
        <QuestionList questions={newQuestionsWithAuthors}/>
      </div>
      <div className="dashboard__item">
        <Typography variant="h4" component="div" gutterBottom sx={{textAlign: 'center'}}>
          Done
        </Typography>
        <QuestionList questions={doneQuestionsWithAuthors}/>
      </div>
    </div>
  )
}
