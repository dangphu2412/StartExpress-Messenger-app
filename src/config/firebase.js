import admin from 'firebase-admin';

admin.initializeApp({
    credential: admin.credential.cert(process.env.FIREBASE_CERT),
    databaseURL: 'https://<FIREBASE_PROJECT_ID>.firebaseio.com',
});

export default admin;