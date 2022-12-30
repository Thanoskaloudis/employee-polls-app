import { Typography } from '@mui/material';
import { authUserSelector } from '../../features/auth/authSlice';
import { pollSelector } from '../../features/poll/pollSlice';
import { userSelector } from '../../features/user/userSlice';
import { useAppSelector } from '../../store/hooks';
import { Question, QuestionWithAuthor } from '../../utils/models';
import { QuestionList } from '../QuestionList/QuestionList';
import './Dashboard.scss';

export const Dashboard = () => {
  const authUser = useAppSelector(authUserSelector);
  const answeredQuestionIds = Object.keys(authUser!.answers);
  const poll = useAppSelector(pollSelector);
  const user = useAppSelector(userSelector);

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
