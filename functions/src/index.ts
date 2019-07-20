import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as firebase from 'firebase';
const serviceAccount = require("../processingallotmentstask-firebase-adminsdk-yo33r-6fb4fec120.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://processingallotmentstask.firebaseio.com"
});



export const onCreateAllotment = functions.database.ref('/allotments/{personId}/{filesId}')
.onCreate((snapshot, context)=>
{
    
    const allotmentData = snapshot.val()
    const personEmail = allotmentData.emailAddress
    const fileName = allotmentData.fileName
    
    // tslint:disable-next-line: no-floating-promises
    firebase.database().ref('/files/'+fileName).update({status: "Given"});

    
    // tslint:disable-next-line: no-void-expression
    return writeEmailData (personEmail, "body","subject")
         
    
});


function writeEmailData(recipient, body, subject) {
    const newEmail = firebase.database().ref('/emails/')
    newEmail.push({recipient, body, subject});
    return newEmail
  }