import { Request, Response, Router } from 'express';
import xlsx, { CellObject, WorkBook } from 'xlsx';
import {
  KeysTables,
  ObjectTables,
  RouteParams,
} from './getTableController.interfaces';
import path from 'path';
import { ApiError } from '../../global/interfaces';

const router = Router();

interface ApiResponse {
  data: ObjectTables;
  keys: KeysTables;
}

router.get(
  '/:file_name',
  function (req: Request<RouteParams>, res: Response<ApiResponse | ApiError>) {
    const { file_name } = req.params;

    let table: WorkBook;

    try {
      table = xlsx.readFile(
        path.join(process.cwd(), 'public', 'data', file_name)
      );
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

    res.json({ data: objectTables, keys: keysInTables });
  }
);

export default router;
