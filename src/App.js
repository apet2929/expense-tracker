import './App.css';
import { getAuth } from 'firebase/auth';
import UserHeader from './components/UserHeader';
import { SignInButton, SignOutButton } from './components/LoginControl';
import React, { useState } from 'react';
import { loadUserTransactions, sumTransactionsAmount } from './functions/transactions';


function getPhotoUrl(user){
  if (typeof user.photoUrl != 'undefined') {
    return user.photoUrl;
  } 
  return null;
}

function printUser(event) {
  console.dir(getAuth().currentUser);
}

function authUser() {
  return new Promise(function (resolve, reject) {
     getAuth().onAuthStateChanged(function(user) {
        if (user) {
           resolve(user);
        } else {
           reject('User not logged in');
        }             
     });
  });
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userAuthenticating: true
    };

  }

  componentDidMount(){
    authUser().then((user) => {
      console.log("User signed in!");
      this.setState({
        userAuthenticating: false
      });
    }, (err) => {
      alert(err);
      this.setState({
        userAuthenticating: false
      });
    });
  }

  render(){
    if(this.state.userAuthenticating){
      return null;
    } else {
      let user = getAuth().currentUser;
      if(user) {
        let transactions = loadUserTransactions(user.uid);
        let totalMoney = transactions ? sumTransactionsAmount(transactions) : 0;
        return (
          <div className="App">
            <UserHeader username={user.displayName}/>
            <SignOutButton />
            <div class="main">
                <h1 class="totalMoney">Total Money: ${totalMoney}</h1>
                <hr class="totalUnderline"></hr>
    
              </div>
          </div>
        );
      } else {
        return (
          <div className="App">
            <h1>Sign in!</h1>
            <SignInButton />
            
          </div>
        );
      }
    }
  }
}

export default App;