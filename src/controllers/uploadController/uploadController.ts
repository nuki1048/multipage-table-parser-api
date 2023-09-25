import { Router, Request, Response } from 'express';
import { upload } from '../../options/multerOptions';

const router = Router();
router.post(
  '/',
  upload.single('xlsx_file'),
  function (req: Request, res: Response) {
    if (!req.file)
      return res.status(404).json({ message: 'File not found, try again.' });

    const imageName = req.file.filename;

    return res
      .status(201)
      .send({ message: 'File successfully uploaded.', fileName: imageName });
  }
);
export default router;
