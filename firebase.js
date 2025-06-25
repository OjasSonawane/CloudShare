console.log('GOOGLE_APPLICATION_CREDENTIALS:', process.env.GOOGLE_APPLICATION_CREDENTIALS);
const admin = require('firebase-admin');


const serviceAccount = require('./cloudshare-os-firebase-adminsdk-fbsvc-2c0c3526a6.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const bucket = admin.storage().bucket();

module.exports = bucket;