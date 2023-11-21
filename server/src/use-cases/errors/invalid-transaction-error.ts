export class InvalidTransactionError extends Error {
  constructor() {
    super('Saldo insuficiente.')
  }
}
