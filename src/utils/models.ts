export type User = {
  id: string,
  name?: string,
  avatarURL?: string|null,
  answers: { key: string },
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
      key: string,
  },
  questions: Array<string>,
}

export interface UsersResponse {
  [key: string]: User,
}