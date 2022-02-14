import firebaseui from "firebaseui";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { addUser, getUserFromId } from "./Firestore";
import React from "react";

var provider = new GoogleAuthProvider();

export function googleSignin() {
    
    signInWithPopup(getAuth(), provider).then(function(result) {
        var user = result.user;
        const userData = {
            user_id: user.displayName,
            email: user.email
        };
        addUser(userData);
        return true;

    }).catch(function(error) {
        console.log(error.code)
        console.log(error.message)
        return false;
    });
}

export function googleSignout() {
    signOut(getAuth())
     
    .then(function() {
       console.log('Signout Succesfull')
    }, function(error) {
       console.log('Signout Failed')  
       console.error(error);
    });
}