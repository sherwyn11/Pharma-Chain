import { Router } from 'express';
import { saveTransactionDetails } from '../controllers/transaction.controller'

const transactionRouter = Router();

transactionRouter.route('/save-details').post(saveTransactionDetails);

export default transactionRouter;