import firebaseui from "firebaseui";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { addUser, getUserFromId } from "./Firestore";
import React from "react";

var provider = new GoogleAuthProvider();

export function googleSignin() {
    
    signInWithPopup(getAuth(), provider).then((result) => {
        console.log("Sign in result: ");
        console.dir(result);
        var user = result.user;

        const userData = {
            user_id: user.uid,
            email: user.email
        };

        addUser(userData);
        return true;

    }).catch((error) => {
        console.error("Sign in error!")
        console.dir(error)
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