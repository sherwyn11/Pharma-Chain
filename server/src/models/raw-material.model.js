import db from '../db/init';

class RawMaterial {

    constructor(description, quantity, rawMaterialAddress) {
        this.description = description;
        this.quantity = quantity;
        this.rawMaterialAddress = rawMaterialAddress;
    }

    async save() {
        return db.collection('raw-materials').add({
            'description': this.description,
            'quantity': this.quantity,
            'rawMaterialAddress': this.rawMaterialAddress
        }).then(() => {
            return new Promise((resolve, reject) => {
                resolve(true)
            })
        }).catch((e) => {
            return new Promise((resolve, reject) => {
                reject(false)
            })
        })
    }
}

export default RawMaterial;