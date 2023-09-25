import express from 'express';

import uploadController from '../controllers/uploadController/uploadController';
import getTableController from '../controllers/getTableController/getTableController';
import getListFilesController from '../controllers/getListFilesController/getListFilesController';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/upload', uploadController);
router.use('/getTable', getTableController);
router.use('/getListFiles', getListFilesController);

export default router;
