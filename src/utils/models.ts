export type User = {
  id: string,
  name?: string,
  avatarURL?: string|null,
  answers: {
      [key: string]: keyof typeof questionOptions,
  },
  questions: Array<string>,
}
export type AuthState = {
  isAuthenticated: boolean,
  userId?: string,
  status: 'idle' | 'loading' | 'failed',
};

export type AuthResponse = {
  id: string,
  password: string,
  name: string,
  avatarURL?: string,
  answers: {
    [key: string]: keyof typeof questionOptions,
  },
  questions: Array<string>,
}

export interface UsersResponse {
  [key: string]: User,
}

export type UsersById = {
  [key: string]: User,
};

export type UserState = {
  users: {
      byId: UsersById,
      allIds: Array<string>,
  },
  status: 'idle' | 'loading' | 'failed',
}

export type UserWithScore = User & { score: number };

export enum questionOptions { optionOne = 'optionOne', optionTwo = 'optionTwo' };

export type Option = {
  votes: Array<string>,
  text: string,
}

export type Question = {
  id: string,
  author: string,
  timestamp: number,
  optionOne: Option,
  optionTwo: Option,
};

export type QuestionsResponse = {
  [key: string]: Question,
}

export type QuestionsById = {
  [key: string]: Question,
};

export type PollState = {
  questions: {
      byId: QuestionsById,
      allIds: Array<string>,
  },
  status: 'idle' | 'loading' | 'failed',
}

export type StoreQuestionAsyncArgs = { author: string, optionOneText: string, optionTwoText: string };

export type StoreAnswerArgs = { userId: string, questionId: string, answer: questionOptions };