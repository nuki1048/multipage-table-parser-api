import multer from 'multer';
import { Callback } from '../global/interfaces';
import { Request } from 'express';
import path from 'path';
const MAX_FILE_SIZE = 1 * 1000 * 1000;

export const storage = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: Callback
  ) {
    cb(null, path.join(process.cwd(), 'public', 'data'));
  },
  filename: function (req: Request, file: Express.Multer.File, cb: Callback) {
    const name = file.originalname.split('.');
    cb(null, name[0] + path.extname(file.originalname));
  },
});

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
});
