import { Fragment } from 'react';
import { QuestionListProps, QuestionWithAuthor } from '../../utils/models';
import QuestionListItem from '../QuestionListItem/QuestionListItem';
import './QuestionList.scss';

export const QuestionList = ({questions}: QuestionListProps) => {
  return (
      <div className="list">
        {questions.length ? (
          questions.map(
            (question: QuestionWithAuthor, i: number) => (
              <div key={question.id} className="list__item">
                <QuestionListItem question={question}/>
              </div>
            )
          )
        ) : (
          <div className="list__message">
            <p>No Question found</p>
          </div>
        )}
      </div>
  );
};
