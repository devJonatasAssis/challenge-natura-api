import { randomBytes } from 'node:crypto';
import { Request } from 'express';
import { resolve } from 'path';

const tmpFolder = resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  tmpFolder: string;
  config: {
    aws: {
      bucket: string;
    };
  };
}

export default {
  tmpFolder,
  config: {
    aws: {
      bucket: process.env.AWS_BUCKET_NAME,
    },
  },
} as IUploadConfig;

export class HelperUpload {
  static customFileName(request: Request, file: any, callback) {
    const fileHash = randomBytes(10).toString('hex');
    const fileName = `${fileHash}-${file.originalname}`;
    return callback(null, fileName);
  }
}
