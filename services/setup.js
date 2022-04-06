import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import functions from '@react-native-firebase/functions';
import messaging from '@react-native-firebase/messaging';

const firebaseConfigOldest = {
  apiKey: 'AIzaSyDTFYgT9wfhHLPNvFtZK9EtxJRYXxGAGsY',
  authDomain: 'last-page-54d6b.firebaseapp.com',
  projectId: 'last-page-54d6b',
  storageBucket: 'last-page-54d6b.appspot.com',
  messagingSenderId: '344692318079',
  appId: '1:344692318079:web:778275c2d2a87b27ae444a',
  measurementId: 'G-CB4SCHYRHB',
};

const firebaseConfigOld = {
  apiKey: "AIzaSyC0Tilwu_FugPCVHu-4D99W7IraqTWzfkY",
  authDomain: "sporbit-cfcd6.firebaseapp.com",
  projectId: "sporbit-cfcd6",
  storageBucket: "sporbit-cfcd6.appspot.com",
  messagingSenderId: "1016018154153",
  appId: "1:1016018154153:web:53915844d4edabfcc06fb8",
  measurementId: "G-47CQTDBSS6",
};

const firebaseConfig = {
  apiKey: "AIzaSyAKmkFiQ2JF4PsW_7s3vJC9QmY0KOg8hMU",
  authDomain: "sporbit-playstore.firebaseapp.com",
  projectId: "sporbit-playstore",
  storageBucket: "sporbit-playstore.appspot.com",
  messagingSenderId: "1015906514416",
  appId: "1:1015906514416:web:83db346f7b96db5bbd9935",
  measurementId: "G-9KM5T706N5",
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig).then();
}
export default () => {
  return {storage, firebase, auth, firestore, functions, messaging};
};
