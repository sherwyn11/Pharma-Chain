import Medicine from '../models/medicine.model';

const saveMedicineDetails = async (req, res) => {
    let medicine = new Medicine(req.body.medicineAddress, req.body.description, req.body.quantity, req.body.rawMaterialAddress);
    let returnValue = await medicine.save();
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

export { saveMedicineDetails };