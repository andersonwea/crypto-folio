export class InvalidTransactionError extends Error {
  constructor() {
    super('Balance unavailable.')
  }
}
