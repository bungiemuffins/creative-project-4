const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');

const firebaseApp = firebase.initializeApp(
    functions.config().firebase
);

const app = express();
app.use(express.static('public'));

var db = firebase.firestore();
var itemsRef = db.collection('items');


//create item
app.post('/api/items', async (req, res) => {
    try {
        let querySnapshot = await itemsRef.get();
        let numRecords = querySnapshot.docs.length;
        let item = {
            id: numRecords * 2,
            comment: req.body.comment
        };
        itemsRef.doc(item.id.toString()).set(item);
        res.send(item);
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
});

// Get a list of all of the items in the list
app.get('/api/items', async (req, res) => {
    try{
        let querySnapshot = await itemsRef.get();
        console.log(querySnapshot);
        console.log(querySnapshot.docs);
        res.send(querySnapshot.docs.map(doc => doc.data()));
    }catch(err){
        res.sendStatus(500);
    }
});


// Delete an item from the list.
app.delete('/api/items/:id', async (req, res) => {
    let id = req.params.id.toString();
    var documentToDelete = itemsRef.doc(id);
    console.log(documentToDelete);
    try {
        var doc = await documentToDelete.get();
        if(!doc.exists) {
            res.status(404).send("Sorry, that item doesn't exist");
            return;
        }
        else {
            documentToDelete.delete();
            res.sendStatus(200);
            return;
        }
    }
    catch(err) {
        res.status(500).send("Error deleting document: ", err);
    }
});

//edit a comment  FIXME!!!
app.put('/api/items/:id', async (req, res) => {
    let id = req.params.id.toString();
    let itemComment = req.body.comment;
    var documentToEdit = itemsRef.doc(id);
    try {
        documentToEdit.update({
            comment: itemComment
        });
    }
    catch(err) {
        res.status(500).send("Error editing document", err);
    }
});


exports.app = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
