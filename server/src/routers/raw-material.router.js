import { Router } from 'express';
import { saveRawMaterialDetails } from '../controllers/raw-material.controller'

const rawMaterialRouter = Router();

rawMaterialRouter.route('/save-details').post(saveRawMaterialDetails);

export default rawMaterialRouter;