import { List, ListItem, ListItemText } from '@mui/material';
import React, { Fragment } from 'react';
import { QuestionListProps, QuestionWithAuthor } from '../../utils/models';

export const QuestionList = ({questions}: QuestionListProps) => {

  console.log(questions)
  return (
    <div>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {questions.length ? (
          questions.map(
            (question: QuestionWithAuthor, i: number) => (
              <Fragment key={question.id}>
                {question.id}
              </Fragment>
            )
          )
        ) : (
          <ListItem>
            <ListItemText primary="No questions to see here..." />
          </ListItem>
        )}
      </List>
    </div>
  );
};
