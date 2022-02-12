import firebaseui from "firebaseui";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { addUser, getUserFromId } from "./Firestore";

var provider = new GoogleAuthProvider();
var currentUser = null;
var timeout = 1000000;

getAuth().onAuthStateChanged(function(user) {
    // TODO : Figure out why react isn't re-rendering after I sign in.
    if (user) {
        console.log("User signed in");
        currentUser = user;
        user.getIdToken().then(function(data) {
            console.log(data)
        });
    }
});

export function getCurrentUser() {
    return currentUser;
}

export function googleSignin() {
    const shouldSignIn = !currentUser;
    if(shouldSignIn){
        signInWithPopup(getAuth(), provider).then(function(result) {
            var user = result.user;
            document.getElementById("loader").style.display = "none";
            const userData = {
                user_id: user.displayName,
                email: user.email
            };
            addUser(userData);

        }).catch(function(error) {
            console.log(error.code)
            console.log(error.message)
        });
    }
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

