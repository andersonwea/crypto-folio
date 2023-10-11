export class RequestFileTooLargeError extends Error {
  constructor() {
    super('Request File is Too Large.')
  }
}
