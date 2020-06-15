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

exports.getCSV = functions.https.onRequest(async (request, response) => {
  const { Parser } = require("json2csv");
  console.log(request)
  const fields = [
    {
      label: "Ref",
      value: "referencia"
    },
    {
      label: "Data",
      value: "data"
    },
    {
      label: "Fornecedor",
      value: "fornecedor"
    }
  ];
  const opts = {
    fields,
    excelStrings: true,
    transforms: [
      item => ({
        referencia: item.referencia,
        data: this.$moment(item.data).format("YYYY-MM-DD"),
        fornecedor: item.fornecedor
      })
    ]
  };
  dataL = new Date(dataL).toISOString()
  dataH = new Date(dataH).toISOString()
  let res = await db.collection(`dados/registos/${auth.user.localId}`).where("data", ">=", dataL).where("data", "<=", dataH)
  console.log(res)

  try {
    const json2csvParser = new Parser(opts);
    const csv = json2csvParser.parse(res);
    console.log(csv);
    response.setHeader(
      "Content-disposition",
      "attachment; filename=report.csv"
    )
    response.set("Content-Type", "text/csv")
    response.status(200).send(csv)
  }
  catch (err) {
    console.error(err);
  }
})


