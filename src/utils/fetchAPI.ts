import { users } from '../data/_DATA';
import {_getQuestions, _saveQuestion, _saveQuestionAnswer} from "../data/_DATA";
import { AuthResponse, QuestionsResponse, UsersResponse } from './models';

export function fetchUsers(): Promise<UsersResponse> {
    return new Promise((resolve) => {
        // @ts-ignore
        setTimeout(() => resolve(users), 1000);
    })
}

export function fetchLogin(username: string, password: string): Promise<{ data: AuthResponse }> {
    return new Promise<{ data: AuthResponse }>((resolve, reject) =>
        setTimeout(() => {
            if (Object.keys(users).includes(username)) {
                // @ts-ignore
                const user = users[username];

                if (user.password !== password) {
                    reject('Wrong password.');
                }

                return resolve({data: user});
            }

            return reject('User not found.');
        }, 500)
    );
}

export function fetchQuestions(): Promise<QuestionsResponse> {
    return _getQuestions();
}

// @ts-ignore
export function storeAnswer(args): Promise<AnswerResponse> {
    return _saveQuestionAnswer(args);
}

// @ts-ignore
export function storeQuestion(args): Promise<StoreQuestionResponse> {
    return _saveQuestion(args);
}