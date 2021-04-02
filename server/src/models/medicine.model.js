import db from '../db/init';

class Medicine {

    constructor(medicineAddress, description, quantity, rawMaterialAddress) {
        this.medicineAddress = medicineAddress;
        this.description = description;
        this.quantity = quantity;
        this.rawMaterialAddress = rawMaterialAddress;
    }

    async save() {
        return db.collection('medicines').add({
            'medicineAddress': this.medicineAddress,
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

export default Medicine;