import { RootState } from "../../store/store";
import { AuthState, PollState, UserState } from "../../utils/models";
import pollReducer, {pollSelector, store, update} from "./pollSlice";

describe('poll reducer', () => {
    const initialAuthState: AuthState = {
        isAuthenticated: false,
        userId: undefined,
        status: 'idle',
    };

    const initialPollState: PollState = {
      status: 'loading',
      questions: {
          byId: {},
          allIds: [],
      },
    };

    const initialUserState: UserState = {
        status: 'idle',
        users: {
            byId: {},
            allIds: [],
        }
    };

    it('should handle initial state', () => {
        expect(pollReducer(undefined, {type: 'unknown'})).toEqual({
            status: 'loading',
            questions: {
                byId: {},
                allIds: [],
            },
        });
    });

    it('should store new questions', () => {
        const poll = pollReducer(initialPollState, store({
            id: ':id:',
            author: ':author:',
            timestamp: 0,
            optionOne: {
                votes: [],
                text: ':optionOne.text:',
            },
            optionTwo: {
                votes: [],
                text: ':optionTwo.text:',
            },
        }));

        expect(poll.questions.byId[':id:'].id).toEqual(':id:');
        expect(poll.questions.byId[':id:'].author).toEqual(':author:');
        expect(poll.questions.byId[':id:'].timestamp).toEqual(0);
        expect(poll.questions.byId[':id:'].optionOne.text).toEqual(':optionOne.text:');
        expect(poll.questions.byId[':id:'].optionOne.votes).toEqual([]);
        expect(poll.questions.byId[':id:'].optionTwo.text).toEqual(':optionTwo.text:');
        expect(poll.questions.byId[':id:'].optionTwo.votes).toEqual([]);
        expect(poll.questions.allIds).toEqual([':id:']);
    });

    it('should update existing questions', () => {
        const pollState: PollState = {
            ...initialPollState,
            questions: {
                ...initialPollState.questions,
                byId: {
                    ...initialPollState.questions.byId,
                    ':id:': {
                        id: ':id:',
                        author: ':author:',
                        timestamp: 0,
                        optionOne: {
                            votes: [],
                            text: ':optionOne.text:',
                        },
                        optionTwo: {
                            votes: [],
                            text: ':optionTwo.text:',
                        },
                    },
                },
                allIds: [':id:'],
            },
        }

        const poll = pollReducer(pollState, update({
            id: ':id:',
            author: ':author_updated:',
            timestamp: 1,
            optionOne: {
                votes: [':voter:'],
                text: ':optionOne.text_updated:',
            },
            optionTwo: {
                votes: [':voter:'],
                text: ':optionTwo.text_updated:',
            },
        }));

        expect(poll.questions.byId[':id:'].id).toEqual(':id:');
        expect(poll.questions.byId[':id:'].author).toEqual(':author_updated:');
        expect(poll.questions.byId[':id:'].timestamp).toEqual(1);
        expect(poll.questions.byId[':id:'].optionOne.text).toEqual(':optionOne.text_updated:');
        expect(poll.questions.byId[':id:'].optionOne.votes).toEqual([':voter:']);
        expect(poll.questions.byId[':id:'].optionTwo.text).toEqual(':optionTwo.text_updated:');
        expect(poll.questions.byId[':id:'].optionTwo.votes).toEqual([':voter:']);
        expect(poll.questions.allIds).toEqual([':id:']);
    });

    it('should select poll', () => {
        const rootState: RootState = {
            auth: initialAuthState,
            poll: initialPollState,
            user: initialUserState,
        };
        const poll = pollSelector(rootState);

        expect(poll.questions).toEqual({byId: {}, allIds: []});
        expect(poll.status).toEqual('loading');
    })
});
