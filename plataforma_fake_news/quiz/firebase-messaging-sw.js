// Import scripts do Firebase Messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Configurações do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBG9E6sm39XIq2u1fZqBcjtgVjbBj82f7I",
    authDomain: "site-icoma.firebaseapp.com",
    projectId: "site-icoma",
    storageBucket: "site-icoma.appspot.com",
    messagingSenderId: "1017122050471",
    appId: "1:1017122050471:web:d0f0fdd2b2e4496dc76682",
    measurementId: "G-LZMEKHFYXX"
};

// Inicializa o Firebase no Service Worker
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Manipula mensagens de background
messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Recebeu uma mensagem de background ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/firebase-logo.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
