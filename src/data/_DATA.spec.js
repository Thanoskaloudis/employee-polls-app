import {_saveQuestion, _saveQuestionAnswer} from "./_DATA";

describe('data', () => {
    it('should save the given question', async () => {
        const question = {
            author: ':author:',
            timestamp: 100,
            optionOneText: ':optionOne.text:',
            optionTwoText: ':optionTwo.text:',
        };

        const res = await _saveQuestion(question);
        expect(res.id).toBeTruthy();
        expect(res.author).toBe(':author:');
        expect(res.optionOne.text).toBe(':optionOne.text:');
        expect(res.optionTwo.text).toBe(':optionTwo.text:');
    });

    it('should not save the given invalid question', async function () {
        const res = _saveQuestion({});

        await expect(res).rejects.toEqual(
            'Please provide optionOneText, optionTwoText, and author'
        );
    });

    it('should save the given answer', async () => {
        const answer = {
            authedUser: 'sarahedo',
            qid: '8xf0y6ziyjabvozdd253nd',
            answer: 'optionOne',
        };

        const res = await _saveQuestionAnswer(answer);
        expect(res).toBeTruthy();
    });

    it('should not save the given invalid answer', async function () {
        const res = _saveQuestionAnswer({});

        await expect(res).rejects.toEqual(
            'Please provide authedUser, qid, and answer'
        );
    });
});
