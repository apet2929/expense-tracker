// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";
import { doc, collection, getDocs, getDoc, getFirestore, addDoc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyDmuYD03e6IQeR-x8tysBj5xpRudMu3ymM",

  authDomain: "apetersen-expense-tracker.firebaseapp.com",

  projectId: "apetersen-expense-tracker",

  storageBucket: "apetersen-expense-tracker.appspot.com",

  messagingSenderId: "408375267756",

  appId: "1:408375267756:web:4f129cac835fc2afac6a09",

  measurementId: "G-D08Z8RXFL8"

};


// Initialize Firebase

export const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export function addUser(userData) {
  console.log(`Trying to add user! User:`);
  console.dir(userData)

  doesUserExist(userData.user_id).then((exists) => {
    if(exists){
      console.log(`User with email ${userData.email} already exists!`);
    } else {
      let initial_data = {
        user_id: userData.user_id,
        email: userData.email,
        transaction_history: []
      };
      saveUser(initial_data);
    }
    }, error => console.error(error));

}

export function saveUser(userData) {
  const db = getFirestore(app);
  setDoc(doc(db, "users", userData.user_id), {
    user_id: userData.user_id,
    email: userData.email,
    transaction_history: JSON.stringify(userData.transaction_history)
  }); 

  let elem = document.getElementById("saveStatus");
  elem.innerText = "Saved!";
  elem.hidden = false;
  setTimeout(() => {
    elem.hidden = true;
    
  }, 5000);
}

export async function loadUser(user_id){
  const db = getFirestore(app);
  const docRef = doc(db, "users", user_id);
  const docSnapshot = await getDoc(docRef);
  
  if(docSnapshot.exists()) {
    let data = docSnapshot.data();
    return data;
  } else {
    console.error(`User with id ${user_id} does not exist in the database!`);
  }
}

async function doesUserExist(user_id) {
  console.log("Checking if user exists!");
  let users = await getUsers();
  for(const user of users){
    console.dir(user);
    const equals = (user.user_id == user_id);
    console.log(`${user.user_id} == ${user_id} -> ${equals}`);
    if(equals) return true;
  }
  return false;
}


export async function getUsers() {
  const db = getFirestore(app);
  const querySnapshot = await getDocs(collection(db, "users"));
  let users = [];

  querySnapshot.forEach((doc) => {
      users.push(doc.data());
  });
  return users;
}

export function getUserFromId(id) {
  getUsers().then((users) => {

    users.forEach((user) => {
      if(user.user_id === id) return user;
    });
    console.error(`No user with id ${id} exists!`);
  });
}

export function printUsers() {
  getUsers().then((users) => {
    users.forEach((user) => {
      console.dir(user);
    })
  }, (err) => console.error(err));
}
