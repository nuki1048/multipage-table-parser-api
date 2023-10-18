import express, { Router } from 'express';
import tableRouter from '@/routes/tableRoute';
import fileRouter from '@/routes/filesRoute';
const router = Router();

router.use('/table', tableRouter);
router.use('/files', fileRouter);

export default router;
