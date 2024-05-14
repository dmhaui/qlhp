// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyAy2pYqsON8gyH1_HzB-jfSZRTXc46rzyM",
    authDomain: "qlhp-6dc0a.firebaseapp.com",
    databaseURL: "https://qlhp-6dc0a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "qlhp-6dc0a",
    storageBucket: "qlhp-6dc0a.appspot.com",
    messagingSenderId: "215730772223",
    appId: "1:215730772223:web:5cb60d9b0a31c632d914ca",
    measurementId: "G-53J8STD2EP"
  };

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(notificationTitle,
    notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
  const clickAction = event.notification.data.click_action || event.notification.click_action;
  event.notification.close();

  if (clickAction) {
    clients.openWindow(clickAction);
  } else {
    // Open the default page if no click_action is provided
    clients.openWindow('/');
  }
});