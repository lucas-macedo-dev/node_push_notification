importScripts("https://www.gstatic.com/firebasejs/7.19.0/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/7.19.0/firebase-messaging.js",
);
// For an optimal experience using Cloud Messaging, also add the Firebase SDK for Analytics.

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.usePublicVapidKey("");

messaging.setBackgroundMessageHandler(function (payload) {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload,
    );
    // Customize notification here
    const notificationTitle = "Notification";
    const notificationOptions = {
        body: "Please check, you have notification.",
    };

    return self.registration.showNotification(
        notificationTitle,
        notificationOptions,
    );
});