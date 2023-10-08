import { Request, Response, Router } from 'express';
import fs from 'fs';
import { fileAndSize } from '../../utils/file-utils';
import path from 'path';
import { ApiError, FileWithSize } from '../../global/interfaces';

const router = Router();

interface ResponseApi {
  data: FileWithSize[];
}

router.get('/', (req: Request, res: Response<ResponseApi | ApiError>) => {
  const directoryPath = path.join(path.join(process.cwd(), 'public', 'data'));

  fs.readdir(directoryPath, 'utf-8', (err, files) => {
    if (err) {
      return res
        .status(500)
        .json({ message: 'Something went wrong,try again.' });
    }

    const filesWithSize: FileWithSize[] = [];

    files.forEach((file) => {
      const pathToFile = path.join(directoryPath, file);

      filesWithSize.push(fileAndSize(pathToFile, file));
      console.log(fileAndSize(pathToFile, file));
    });

    res.set('Content-Type', 'application/json');

    return res.status(200).json({ data: filesWithSize });
  });
});

export default router;
