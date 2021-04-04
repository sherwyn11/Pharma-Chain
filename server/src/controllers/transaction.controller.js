import Transaction from '../models/transaction.model';
import { manipulateGeopoints, manipulateTimestamps } from '../utils/manipulator';

const saveTransactionDetails = async (req, res) => {
    let geoPoints = manipulateGeopoints(req.body.geoPoints);
    let timestamps = manipulateTimestamps(req.body.timestamps);
    let transaction = new Transaction(req.body.medicineAddress, req.body.fromAddresses, req.body.toAddresses, req.body.hash, req.body.previousHash, geoPoints, timestamps);
    let returnValue = await transaction.save();
    if (returnValue) {
        res.status(201).send({
            'message': 'Saved!',
            'error': false
        });
    } else {
        res.status(201).send({
            'message': 'Saved!',
            'error': true
        });
    }
}

export { saveTransactionDetails };