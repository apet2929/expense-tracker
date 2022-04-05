import './App.css';
import { getAuth } from 'firebase/auth';
import UserHeader from './components/UserHeader';
import { SignInButton, SignOutButton } from './Auth';
import React from 'react';
import { loadUserTransactions, sumTransactionsAmount } from './functions/transactions';
import { loadUserData, saveUser } from './Firestore';
import Footer from './components/Footer';
import TransactionTableView from './components/TransactionTableView';
import TransactionChartView from './components/charts/TransactionChartView';
import EditTransactionModal from './components/modal/EditTransactionModal';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userAuthenticating: true,
      user: getAuth().currentUser,
      transactionsLoading: true,
      transaction_history: [],
      editing: false,
      editing_id: null,
      onHistoryChanged: () => {}
    };
  }

  componentDidMount(){
    this.deleteTransaction = this.deleteTransaction.bind(this);
    this.endEditing = this.endEditing.bind(this);
    this.startCreateTransaction = this.startCreateTransaction.bind(this);
    this.createTransaction = this.createTransaction.bind(this);
    this.setTransaction = this.setTransaction.bind(this);
    this.requestEdit = this.requestEdit.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    this.save = this.save.bind(this);

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

    this.setState({
      onHistoryChanged: this.save
    })
  }

  save() {
    console.log("Saving!");
    saveUser(this.state);
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
    }, (err) => {
      // New user
      this.setState({
        transactionsLoading: false,
        transaction_history: []
      });
      this.save();
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

  getTransaction(transaction_id){
    return this.state.transaction_history.find((transaction) => {
      return transaction.id === transaction_id;
    });
  }

  startCreateTransaction(){
    this.setState({
      editing: true,
      editing_id: null
    });
  }

  deleteTransaction(id) {
    const remainingTransactions = this.state.transaction_history.filter(t => t.id !== id)
    this.setState({
        transaction_history: remainingTransactions
    }, () => {this.state.onHistoryChanged()});
}

  createTransaction(transaction){
    let newHistory = this.state.transaction_history;
    newHistory.push(transaction);
    this.setState({
      transaction_history: newHistory
    },  () => {this.state.onHistoryChanged()});
  }

  setTransaction(transaction_id, new_transaction){
    if(transaction_id === null){
      this.createTransaction(new_transaction);
      return;
    }
    let old_transaction = this.getTransaction(transaction_id);
    let index = this.state.transaction_history.indexOf(old_transaction);
    let newHistory = this.state.transaction_history;
    newHistory[index] = new_transaction
    this.setState({
      transaction_history: newHistory
    },  () => {this.state.onHistoryChanged()});
  }

  requestEdit(transaction_id){
    if(!this.state.editing){
      this.setState({
        editing: true,
        editing_id: transaction_id
      });
    } else {
      console.log(`Edit requested for ${transaction_id}, but the app is already editing ${this.state.editing_id}`);
    }
  }

  endEditing(){
    this.setState({
      editing: false,
      editing_id: null
    });
  }

  saveEdit(new_transaction) {
    console.log("Saving edit!", new_transaction);
    this.setTransaction(this.state.editing_id, new_transaction);
    this.endEditing();
  }

  render(){
    console.log("Top level rendering!");
    let transactions = this.state.transaction_history;
    transactions.sort(((a,b) => b.date - a.date))
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
                <button onClick={this.startCreateTransaction}>New Transaction</button>
                <SignOutButton />
                <button>View Data</button>
              </section>

              <section id="middle">
                <TransactionTableView transactions={this.state.transaction_history} editTransaction={this.requestEdit} deleteTransaction={this.deleteTransaction} />
                <TransactionChartView transactions={this.state.transaction_history}/>
                <EditTransactionModal transaction={this.getTransaction(this.state.editing_id)} isOpen={this.state.editing} close={this.endEditing} save={this.saveEdit}/>
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