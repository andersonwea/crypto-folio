export class NicknameAlreadyExitsError extends Error {
  constructor() {
    super('Nickname já existe.')
  }
}
