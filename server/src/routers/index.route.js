import { Router } from 'express';
import medicineRouter from './medicine.router';

const router = Router();

router.use('/medicine', medicineRouter);

export default router;