import { Router } from 'express';
import { saveMedicineDetails } from '../controllers/medicine.controller'

const medicineRouter = Router();

medicineRouter.route('/save-details').post(saveMedicineDetails);

export default medicineRouter;