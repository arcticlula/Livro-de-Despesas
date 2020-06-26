const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

exports.registerUser = functions.auth.user().onCreate(async (user) => {
  await db.doc(`/users/${user.uid}`).set({
    admin: false,
    email: user.email,
  }).then(() => {
  }).catch((err) => {
    console.log(`Error creating user: ${err}`);
  });
  await db.doc(`/counter/${user.uid}`).set({
    registos: 1,
    fornecedores: 1,
    servicos: 1
  }).then(() => {
  }).catch((err) => {
    console.log(`Error creating counter: ${err}`);
  });
  return null
});


