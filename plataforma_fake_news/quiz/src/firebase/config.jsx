
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getMessaging } from "firebase/messaging"

const firebaseConfig = {
    apiKey: "AIzaSyBG9E6sm39XIq2u1fZqBcjtgVjbBj82f7I",
    authDomain: "site-icoma.firebaseapp.com",
    projectId: "site-icoma",
    storageBucket: "site-icoma.appspot.com",
    messagingSenderId: "1017122050471",
    appId: "1:1017122050471:web:d0f0fdd2b2e4496dc76682",
    measurementId: "G-LZMEKHFYXX"
}
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const messaging = getMessaging(app)

export { messaging }