export class RequestFileTooLargeError extends Error {
  constructor() {
    super('Arquivo é muito grande.')
  }
}
