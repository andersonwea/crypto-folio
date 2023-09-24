export class ResourceAlreadyExitsError extends Error {
  constructor() {
    super('Resource already exists')
  }
}
