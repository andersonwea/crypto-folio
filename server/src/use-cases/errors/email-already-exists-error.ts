export class EmailAreadyExistsError extends Error {
  constructor() {
    super('Email Already Exists')
  }
}
