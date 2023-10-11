export class NicknameAlreadyExitsError extends Error {
  constructor() {
    super('Nickname Already Exists')
  }
}
