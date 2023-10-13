import express from 'express';

import getTableController from '../controllers/tableController';
import filesController from '../controllers/filesController';
const router = express.Router();

router.use('/table', getTableController);
router.use('/files', filesController);

export default router;
