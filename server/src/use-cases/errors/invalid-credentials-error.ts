export class InvalidCredentialsError extends Error {
  constructor() {
    super('Email ou senha inválidos.')
  }
}
