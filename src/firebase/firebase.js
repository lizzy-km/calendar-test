// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBIUKGA_wTZ57l2mjLpKVgD3WyQT6XCBXs",
  authDomain: "look-vince.firebaseapp.com",
  databaseURL:
    "https://look-vince-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "look-vince",
  storageBucket: "look-vince.appspot.com",
  messagingSenderId: "1001354898081",
  appId: "1:1001354898081:web:ad7b211141974cf82fdee0",
  measurementId: "G-0Y8J2Q1G13",
};

// Initialize Firebase
// Initialize Firebase Authentication and get a reference to the service
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

const storage = getStorage(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const messaging = getMessaging(app);

export const requestForToken = () => {
  return getToken(messaging, {
    vapidKey:
      "BFQ9OcHuYDpuKy28_PXMY3FRsZa5DOOx9cFUTf0VH2dBTJhH_TFvCkbVwa154J5MNNwYRDhtCcxn9TgcNGTs3mg",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log(currentToken);

        return currentToken;

        // Send the token to your server and update the UI if necessary
        // ...
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
        // ...
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // ...
    });
};

onMessage(messaging, ({ notification }) => {
  new Notification(notification.title, {
    body: notification.body,
    icon: notification.icon,
  });
});
export { app, auth, firestore, storage, analytics, db };
