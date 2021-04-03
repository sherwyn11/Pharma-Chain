import { Router } from 'express';
import medicineRouter from './medicine.router';
import rawMaterialRouter from './raw-material.router';

const router = Router();

router.use('/medicine', medicineRouter);
router.use('/raw-material', rawMaterialRouter);

export default router;