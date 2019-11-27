importScripts('https://www.gstatic.com/firebasejs/6.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.6.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  messagingSenderId: '889064671267',
});
const messaging = firebase.messaging();