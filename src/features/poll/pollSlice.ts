import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { fetchQuestions, storeAnswer, storeQuestion } from "../../utils/fetchAPI";
import { PollState, Question, QuestionsById, StoreAnswerArgs, StoreQuestionAsyncArgs } from "../../utils/models";

export const getQuestionsAsync = createAsyncThunk(
    'poll/fetchQuestions',
    async () => await fetchQuestions()
);

export const storeQuestionAsync = createAsyncThunk(
    'poll/storeQuestion',
    async (args: StoreQuestionAsyncArgs) => await storeQuestion(args)
)

export const storeAnswerAsync = createAsyncThunk(
    'poll/storeQuestionAnswer',
    async (args: StoreAnswerArgs) => (await storeAnswer({
        authedUser: args.userId,
        qid: args.questionId,
        answer: args.answer,
    }))
)

const initialState: PollState = {
    questions: {
        byId: {},
        allIds: [],
    },
    status: 'loading',
}

export const pollSlice = createSlice({
    name: 'poll',
    initialState,
    reducers: {
        store: (state: PollState, action: PayloadAction<Question>) => ({
            ...state,
            questions: {
                ...state.questions,
                byId: {
                    ...state.questions.byId,
                    [action.payload.id]: action.payload,
                },
                allIds: [
                    ...state.questions.allIds,
                    action.payload.id,
                ]
            },
        }),
        update: (state: PollState, action: PayloadAction<Question>) => ({
            ...state,
            questions: {
                ...state.questions,
                byId: {
                    ...state.questions.byId,
                    [action.payload.id]: action.payload,
                },
            }
        }),
    },
    extraReducers: (builder) => {
        builder
            .addCase(getQuestionsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getQuestionsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.questions.byId = action.payload;
                state.questions.allIds = pluckQuestionIds(action.payload);
            })
            .addCase(getQuestionsAsync.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(storeAnswerAsync.fulfilled, (state, action) => ({
                ...state,
                questions: {
                    ...state.questions,
                    byId: {
                        ...state.questions.byId,
                        [action.meta.arg.questionId]: {
                            ...state.questions.byId[action.meta.arg.questionId],
                            [action.meta.arg.answer]: {
                                ...state.questions.byId[action.meta.arg.questionId][action.meta.arg.answer],
                                votes: [
                                    ...state.questions.byId[action.meta.arg.questionId][action.meta.arg.answer].votes,
                                    action.meta.arg.userId,
                                ]
                            },
                        }
                    }
                }
            }))
            .addCase(storeQuestionAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(storeQuestionAsync.fulfilled, (state, action) => ({
                ...state,
                status: 'idle',
                questions: {
                    ...state.questions,
                    byId: {
                        ...state.questions.byId,
                        [action.payload.id]: {
                            ...action.payload,
                        },
                    },
                    allIds: [action.payload.id, ...state.questions.allIds],
                },
            }))
            .addCase(storeQuestionAsync.rejected, (state) => {
                state.status = 'failed';
            })
        ;
    },
});

const pluckQuestionIds = (questionsById: QuestionsById): Array<string> => {
    return Object.keys(questionsById)
        .reduce((questions: Array<Question>, questionId: string): Array<Question> => ([
            ...questions,
            questionsById[questionId],
        ]), [])
        .sort((a: Question, b: Question): number => b.timestamp - a.timestamp)
        .reduce((allIds: Array<string>, question: Question): Array<string> => ([
            ...allIds,
            question.id,
        ]), []);
};

export const pollSelector = (state: RootState): PollState => state.poll;

export const {store, update} = pollSlice.actions;

export default pollSlice.reducer;