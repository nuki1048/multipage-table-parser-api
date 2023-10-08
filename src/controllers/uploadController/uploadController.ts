import { Router, Request, Response } from 'express';
import { upload } from '../../options/multerOptions';
import { ApiError } from '../../global/interfaces';

const router = Router();

interface ApiResponse {
  message: string;
  fileName: string;
}

router.post(
  '/',
  upload.single('xlsx_file'),
  function (req: Request, res: Response<ApiResponse | ApiError>) {
    if (!req.file)
      return res.status(404).json({ message: 'File not found, try again.' });

    const fileName = req.file.filename;

    res.set('Content-Type', 'application/json');

    return res
      .status(201)
      .send({ message: 'File successfully uploaded.', fileName });
  }
);
export default router;
