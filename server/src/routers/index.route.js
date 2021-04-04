import { Router } from 'express';
import medicineRouter from './medicine.router';
import rawMaterialRouter from './raw-material.router';
import transactionRouter from './transaction.router';

const router = Router();

router.use('/medicine', medicineRouter);
router.use('/raw-material', rawMaterialRouter);
router.use('/transaction', transactionRouter);

export default router;