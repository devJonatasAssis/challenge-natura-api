import { unlink, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import uploadConfig from '../../config/upload';

import { S3 } from 'aws-sdk';
import { contentType } from 'mime-types';

export class HelperUpload {
  s3 = new S3({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
  });

  public async saveFileS3Storage(file: string) {
    const originalPath = resolve(uploadConfig.tmpFolder, file);

    const fileContent = await readFile(originalPath);

    const ContentType = contentType(originalPath);

    if (!ContentType) {
      throw new Error('Arquivo não encontrado');
    }

    await this.s3
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
        Body: fileContent,
        ContentType,
      })
      .promise();

    await unlink(originalPath);

    return file;
  }

  public async deletedFileS3Storage(file: string) {
    await this.s3
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
      })
      .promise();
  }
}
