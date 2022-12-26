export type User = {
  id: string,
  name?: string,
  avatarURL?: string|null,
  answers: { key: string },
  questions: Array<string>,
}