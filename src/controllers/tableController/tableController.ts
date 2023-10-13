import { Request, Response, Router } from 'express';
import xlsx, { WorkBook } from 'xlsx';
import {
  KeysTables,
  ObjectTables,
  RouteParams,
} from './tableController.interfaces';
import path from 'path';
import { ApiError } from '../../global/interfaces';
import { upload } from '../../options/multerOptions';

const router = Router();

interface ApiGetResponse {
  data: ObjectTables;
  keys: KeysTables;
}

interface ApiPostResponse {
  message: string;
  fileName: string;
}

router.get(
  '/:file_name',
  function (
    req: Request<RouteParams>,
    res: Response<ApiGetResponse | ApiError>
  ) {
    const { file_name } = req.params;

    let table: WorkBook;

    try {
      table = xlsx.readFile(
        path.join(process.cwd(), 'public', 'data', `${file_name}.xlsx`)
      );
      console.log(table);
    } catch (error) {
      return res
        .status(404)
        .json({ message: 'You need to upload file before geting it' });
    }

    let objectTables: ObjectTables = {};
    let keysInTables: KeysTables = {};

    const pageKeys = Object.keys(table.Sheets);

    pageKeys.map((item) => {
      if (!objectTables.hasOwnProperty(item)) {
        objectTables[item] = [];
      }

      const tableJson = xlsx.utils.sheet_to_json(table.Sheets[item]) as Array<{
        [key: string]: any;
      }>;

      keysInTables[item] = Object.keys(tableJson?.[0] || {});
      objectTables[item] = xlsx.utils.sheet_to_json(table.Sheets[item]);
    });

    res.set('Content-Type', 'application/json');

    res.json({
      data: objectTables,
      keys: keysInTables,
    });
  }
);

router.post(
  '/',
  upload.single('xlsx_file'),
  function (req: Request, res: Response<ApiPostResponse | ApiError>) {
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
