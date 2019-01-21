const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.addUserMessages = functions.database.ref(`/messages/{messageId}`).onWrite(event => {
  const messageValue = event.after.val();
admin.database().ref(`/user-messages/${messageValue.userFromId}/${messageValue.userToId}`).child(`${messageValue.mykey}`).set(1);
admin.database().ref(`/user-messages/${messageValue.userToId}/${messageValue.userFromId}`).child(`${messageValue.mykey}`).set(1);
});

exports.generateLastMessage = functions.database.ref(`/messages/{messageId}`).onWrite(event => {
  const messageValue = event.after.val();
admin.database().ref(`/last-messages/${messageValue.userFromId}/${messageValue.userToId}`).child('key').set(messageValue.mykey);
admin.database().ref(`/last-messages/${messageValue.userToId}/${messageValue.userFromId}`).child('key').set(messageValue.mykey);
})
