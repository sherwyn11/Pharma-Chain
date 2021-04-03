import RawMaterial from '../models/raw-material.model';

const saveRawMaterialDetails = async (req, res) => {
    let rawMaterial = new RawMaterial(req.body.description, req.body.quantity, req.body.rawMaterialAddress);
    let returnValue = await rawMaterial.save();
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

export { saveRawMaterialDetails };