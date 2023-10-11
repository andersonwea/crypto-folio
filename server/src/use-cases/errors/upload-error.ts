export class UploadError extends Error {
  constructor() {
    super('Error when requesting to bucket service.')
  }
}
