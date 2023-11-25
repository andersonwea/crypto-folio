import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { BucketService } from '../bucket-service'
import { env } from '@/env'
import { UploadError } from '@/use-cases/errors/upload-error'

export class S3Service implements BucketService {
  private s3Client: S3Client

  constructor() {
    this.s3Client = new S3Client({
      region: env.APP_AWS_REGION,
      credentials: {
        accessKeyId: env.APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: env.APP_AWS_SECRET_ACCESS_KEY,
      },
    })
  }

  async upload(file: Buffer, filename: string, userId: string) {
    const command = new PutObjectCommand({
      Bucket: env.APP_AWS_BUCKET_NAME,
      Key: `users/${userId}/${filename}`,
      Body: file,
    })

    const response = await this.s3Client.send(command)

    if (response.$metadata.httpStatusCode !== 200) {
      throw new UploadError()
    }
  }

  async delete(fileName: string) {
    const command = new DeleteObjectCommand({
      Bucket: env.APP_AWS_BUCKET_NAME,
      Key: fileName,
    })

    await this.s3Client.send(command)
  }
}
