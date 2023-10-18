import { NextFunction, Request, Response } from 'express';
import xlsx from 'xlsx';
import path from 'path';
import fs from 'fs';
import {
  KeysTables,
  ObjectTables,
  RouteParams,
} from './tableController.interfaces';
import { ApiError } from '../../global/interfaces';

interface ApiGetResponse {
  status: string;
  data: ObjectTables;
  keys: KeysTables;
}

interface ApiPostResponse {
  status: string;
  data: {
    file_name: string;
  };
}

export const checkTable = (
  req: Request,
  res: Response,
  next: NextFunction,
  val: string,
) => {
  const filePath = path.join(process.cwd(), 'public', 'data', `${val}.xlsx`);

  const isExist = fs.existsSync(filePath);

  if (!isExist) {
    return res.status(404).json({
      status: 'fail',
      message: 'The file does not exist.',
    });
  }
  next();
};

export const getTable = function (
  req: Request<RouteParams>,
  res: Response<ApiGetResponse | ApiError>,
) {
  const { file_name: fileName } = req.params;

  const table = xlsx.readFile(
    path.join(process.cwd(), 'public', 'data', `${fileName}.xlsx`),
  );

  const objectTables: ObjectTables = {};
  const keysInTables: KeysTables = {};

  const pageKeys = Object.keys(table.Sheets);

  pageKeys.forEach((item) => {
    // eslint-disable-next-line no-prototype-builtins
    if (!objectTables.hasOwnProperty(item)) {
      objectTables[item] = [];
    }

    const tableJson = xlsx.utils.sheet_to_json(table.Sheets[item]) as Array<{
      [key: string]: never;
    }>;

    keysInTables[item] = Object.keys(tableJson?.[0] || {});
    objectTables[item] = xlsx.utils.sheet_to_json(table.Sheets[item]);
  });

  res.json({
    status: 'success',
    data: objectTables,
    keys: keysInTables,
  });
};

export const checkFile = (
  req: Request,
  res: Response<ApiPostResponse | ApiError>,
  next: NextFunction,
) => {
  if (!req.file) {
    return res.status(404).json({ message: 'File not found, try again.' });
  }

  next();
};

export const createTable = function (
  req: Request,
  res: Response<ApiPostResponse | ApiError>,
) {
  return res.status(201).send({
    status: 'success',
    data: {
      file_name: req.file?.filename as string,
    },
  });
};
