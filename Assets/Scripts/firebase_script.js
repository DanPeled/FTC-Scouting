// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField, getDocs, where } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnf5Hkdqhk5tNc1CLzOlaUz5VQnvHBSaY",
  authDomain: "scouting-2023ftc.firebaseapp.com",
  projectId: "scouting-2023ftc",
  storageBucket: "scouting-2023ftc.appspot.com",
  messagingSenderId: "1054772324553",
  appId: "1:1054772324553:web:adb8956216bcb82a218518",
  measurementId: "G-WD5T1X8NH3"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
console.log(app);


// works, tested
async function writeDoc__(collectionName, o_ = {}, id_ = "NONE") {
  const docRef = await setDoc(doc(db, collectionName, id_, "TEST23"), o_)
    .then(() => {
      console.log("Data set successfully");
    }).catch((error) => {
      console.log("Operation failed; error: " + error);
    });
}

// works, tested
async function getDocRef__(collectionName) {
  if (collectionName.length % 2 == 0) {
    let docRef = doc(db, collectionName[0], collectionName[1]);
    for (let index = 2; index < collectionName.length; index += 2) {
      docRef = await doc(docRef, collectionName[index], collectionName[index + 1]);
    }
    return docRef;
  } else if (collectionName.length % 2 == 1) {
    let docRef = doc(db);
    for (let index = 0; index < collectionName.length - 1; index += 2) {
      docRef = await doc(docRef, collectionName[index], collectionName[index + 1]);
    }
    const querySnapshot = await getDocs(collection(docRef, collectionName[collectionName.length - 1]));
    return querySnapshot;
  }
}

// Hasn't been tested yet...
// async function writeDoc__(collectionName, o_ = {}) {
//   if(collectionName.length % 2 != 0) {
//     console.error("collectionNames (length) is unexecutable for search (due to uneven amount of collections and documents)");
//     return;
//   }
//   let docRef = doc(db, collectionName[0], collectionName[1]);
//   for (let index = 2; index < collectionName.length; index += 2) {
//     docRef = await doc(docRef, collectionName[index], collectionName[index + 1]);
//   };  
//   docRef = await setDoc(docRef, o_)
//     .then(() => {
//       console.log("Data set successfully");
//     }).catch((error) => {
//       console.log("Operation failed; error: " + error);
//     });
// }

// works, tested;

async function getDoc__(collectionName, id_) {
  const docSnap = await getDoc(doc(db, collectionName, id_));
  if (docSnap.exists()) {
    console.log("transmitting data");
    return docSnap.data();
  } else {
    console.log("File not found.");
  }
}

// hasn't been tested yet
async function deleteDocs__(collectionName, id_) {
  try {
    await deleteDoc(doc(db, collectionName, id_));
  } catch (error) {
    console.log(error);
    return;
  }
  console.log("Successfully deleted: " + id_);
}