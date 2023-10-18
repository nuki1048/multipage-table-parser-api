import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

import { fileAndSize } from '../../utils/file-utils';
import { ApiError, FileWithSize } from '../../global/interfaces';

interface ResponseApi {
  status: string;
  data: FileWithSize[];
}

// eslint-disable-next-line import/prefer-default-export
export const getAllFiles = (
  req: Request,
  res: Response<ResponseApi | ApiError>,
) => {
  const directoryPath = path.join(process.cwd(), 'public', 'data');

  fs.readdir(directoryPath, 'utf-8', (err, files) => {
    const filesWithSize: FileWithSize[] = [];

    files.forEach((file) => {
      const pathToFile = path.join(directoryPath, file);
      filesWithSize.push(fileAndSize(pathToFile, file));
    });

    return res.status(200).json({ status: 'success', data: filesWithSize });
  });
};
