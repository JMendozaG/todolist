
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { getFirestore, addDoc, collection, getDocs, onSnapshot, deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCW4dEqd3mqeZTy-p6YCQpF3q4EywXX-pE",
    authDomain: "todo-list-d4bfa.firebaseapp.com",
    projectId: "todo-list-d4bfa",
    storageBucket: "todo-list-d4bfa.appspot.com",
    messagingSenderId: "136135910098",
    appId: "1:136135910098:web:46369960ee05624ccd030b"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getFirestore();
  export const saveTask = (title, description) =>
    addDoc(collection(db, 'tasks'), {title, description});
    export const OnGetTasks = (callback) => onSnapshot(collection(db, 'tasks'), callback)

export const deleteTask = id => deleteDoc(doc(db, 'tasks', id));

export const getTask = id => getDoc(doc(db, 'tasks', id));

export const UpdateTask = (id, newFields) => updateDoc(doc(db, 'tasks', id), newFields)