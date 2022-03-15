import './App.css';
import { getAuth } from 'firebase/auth';
import UserHeader from './components/UserHeader';
import { SignInButton, SignOutButton } from './Auth';
import React from 'react';
import { getTransactions, loadUserTransactions, sumTransactionsAmount } from './functions/transactions';
import { loadUserData } from './Firestore';
import Footer from './components/Footer';
import TransactionTableView from './components/TransactionTableView';
import TransactionChartView from './components/TransactionChartView';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userAuthenticating: true,
      user: getAuth().currentUser,
      transactionsLoading: true,
      transaction_history: []
    };
  }

  componentDidMount(){
    
    getAuth().onAuthStateChanged((user) => {
      console.log("Auth state changed!");
      if (user) {
        if(!this.state.user || user.uid !== this.state.user.uid){
          console.log("Signed in!");
          this.signIn(user);
        }
      } else {
        console.log("Signed out!");
        this.signOut();
      }             
    });
  }

  signIn(user){
    this.setState({
      userAuthenticating: false,
      user: user,
    });
    let loadUserPromise = loadUserData(user.uid)
    loadUserPromise.then((userData) => {
      console.log("User Data loaded!");
      let transactions = loadUserTransactions(userData.transaction_history)
      this.setState({
        transactionsLoading: false,
        transaction_history: transactions
      });
    })
  }

  signOut(){
    this.setState({
      userAuthenticating: false,
      user: getAuth().currentUser,
      transactionsLoading: true,
      transaction_history: []
    });
  }

  render(){
    if(this.state.userAuthenticating){
      return null;
    } else {
      let user = getAuth().currentUser;
      
      if(user) {
        let totalMoney = this.state.transactionsLoading ? "Loading..." : "$" + sumTransactionsAmount(this.state.transaction_history);
        return (
          <div className="App">
            <UserHeader username={user.displayName}/>
            <div className="main">
              <h1 className="totalMoney">Total Money: {totalMoney}</h1>
              <hr className="totalUnderline"></hr>
              <section id="buttons">
                <button>New Transaction</button>
                <SignOutButton />
                <button>View Data</button>
              </section>

              <section id="middle">
                <TransactionTableView transactions={this.state.transaction_history} />
                <TransactionChartView transactions={this.state.transaction_history}/>
              </section>
            </div>
            <Footer />
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