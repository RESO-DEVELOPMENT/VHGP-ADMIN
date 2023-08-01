import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyD5do7PbI3lWpwuT5KSmejah5TimQzK-ng",
//     authDomain: "deliveryfood-9c436.firebaseapp.com",
//     projectId: "deliveryfood-9c436",
//     storageBucket: "deliveryfood-9c436.appspot.com",
//     messagingSenderId: "682756485581",
//     appId: "1:682756485581:web:7bcb0b616d335b81285484",
//     measurementId: "G-0HQRH50TQ3",
// };

const firebaseConfig = {
  apiKey: "AIzaSyCYuZ3q5TnMbkO5okCnjxG3jzQr5NomaaY",
  authDomain: "vhgp-9b167.firebaseapp.com",
  projectId: "vhgp-9b167",
  storageBucket: "vhgp-9b167.appspot.com",
  messagingSenderId: "933202759364",
  appId: "1:933202759364:web:f094fb749b7c9e9a9ec391",
  measurementId: "G-9SW4E5ZBM6",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
