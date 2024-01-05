import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyBYtU1GGuuFLkf1J9wxc_fOM9JLBJeQM4U",
  authDomain: "app-de-rotas-4e292.firebaseapp.com",
  projectId: "app-de-rotas-4e292",
  storageBucket: "app-de-rotas-4e292.appspot.com",
  messagingSenderId: "1097908247305",
  appId: "1:1097908247305:web:21b8a89c626a503ee5d1d8"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const st = getStorage(app);

export { app, db, auth, st};
