export interface BucketService {
  upload(file: Buffer, filename: string, userId: string): Promise<void>
}
