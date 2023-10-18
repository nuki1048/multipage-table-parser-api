import { getAllFiles } from '@/controllers/filesController/filesController';
import { Router } from 'express';

const router = Router();

router.route('/').get(getAllFiles);

export default router;
