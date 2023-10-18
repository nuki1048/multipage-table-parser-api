import { Router } from 'express';
import { upload } from '../options/multerOptions';
import {
  checkTable,
  createTable,
  getTable,
} from '../controllers/tableController/tableController';

const router = Router();

router.param('file_name', checkTable);

router.route('/:file_name').get(getTable);
router.route('/upload').post(upload.single('xlsx_file'), createTable);

export default router;
