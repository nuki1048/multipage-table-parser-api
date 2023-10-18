import {
  checkFile,
  checkTable,
  createTable,
  getTable,
} from '@/controllers/tableController/tableController';
import { upload } from '@/options/multerOptions';
import { Router } from 'express';

const router = Router();

router.param('file_name', checkTable);

router.route('/:file_name').get(getTable);
router.route('/upload').post(upload.single('xlsx_file'), createTable);

export default router;
