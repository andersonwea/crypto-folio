export class EmailAlreadyExistsError extends Error {
  constructor() {
    super('Email Already Exists')
  }
}
