export class UserAlreadyExitsError extends Error {
  constructor() {
    super('E-mail already exists')
  }
}
