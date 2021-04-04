import admin from "firebase-admin";

const manipulateGeopoints = (geoPoints) => {
    let newGeopints = [];
    for (let geoPoint of geoPoints) {
        newGeopints.push(new admin.firestore.GeoPoint(geoPoint[0], geoPoint[1]));
    }
    return newGeopints;
}

const manipulateTimestamps = (timestamps) => {
    let newTimestamps = [];
    for (let timestamp of timestamps) {
        newTimestamps.push(admin.firestore.Timestamp.fromDate(new Date(timestamp * 1000)));
    }
    return newTimestamps;
}

export { manipulateGeopoints, manipulateTimestamps };