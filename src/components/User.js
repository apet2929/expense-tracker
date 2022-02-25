import React from "react";
import "firebase/firestore";
import { saveUser, loadUser } from "../Firestore";
import { getAuth } from "firebase/auth";
import LoginControl from "./LoginControl";
import TransactionTableView from "./TransactionTableView";
import Transaction, { TransactionCategory } from "./Transaction";
import TransactionForm from "./TransactionForm";
import TransactionLineChart from "./TransactionLineChart";
import { nanoid } from "nanoid";
import TransactionPieChart from "./TransactionPieChart";
import { googleSignout } from "../Auth";


const FILTER_MAP = {
    All: () => true,
    Food: (transaction) => transaction.category.name === TransactionCategory.Food.name,
    Transportation: (transaction) => transaction.category.name === TransactionCategory.Transportation.name,
    Entertainment: (transaction) => transaction.category.name === TransactionCategory.Entertainment.name,
    Investment: (transaction) => transaction.category.name === TransactionCategory.Investment.name,
    Work: (transaction) => transaction.category.name === TransactionCategory.Work.name,
    Misc: (transaction) => transaction.category.name === TransactionCategory.Misc.name,

    PastThirtyDays: (transaction) => {
        let lastThirty = new Date();
        lastThirty.setDate(lastThirty.getDate() - 30);
        return transaction.date > lastThirty;
    }
  };

const FILTER_NAMES = Object.keys(FILTER_MAP);

class User extends React.Component {

    constructor() {
        super();
        this.state = {
            user_id: "",
            email: "",
            transaction_history: [],
            filter: "All"
        };
    }

    componentDidMount() {
        this.addTransaction = this.addTransaction.bind(this);
        this.isSignedIn = this.isSignedIn.bind(this);
        this.deleteTransaction = this.deleteTransaction.bind(this);

        getAuth().onAuthStateChanged((user) => {
            if (user) {
                console.log("User signed in");
                loadUser(user.uid).then((result) => {
                    let th = this.loadTransactions(result.transaction_history);
                    this.setState({
                        user_id: user.uid,
                        email: user.email,
                        transaction_history: th 
                        // transaction_history: history
                    });
                    this.sortTransactions();
                });
            } else {
                saveUser(this.state);
                
                this.setState({
                    user_id: "",
                    email: "",
                    transaction_history: [],
                    filter: "All"
                });
            }
        });
    }

    

    getCash() {
        let cash = 0;
        let transactions = this.getFilteredTransactions();
        transactions.forEach((transaction) => {
            cash += transaction.amount;
        });
        return cash;
    }

    loadTransactions(json_list_string) {
        let raw_json = JSON.parse(json_list_string);
        var history = [];
        for (const obj of raw_json) {
            history.push(new Transaction(obj.id, new Date(obj.date), obj.amount, obj.category, obj.description));
        }
        return history;
    }

    addTransaction(date, amount, category, description) {
        var newData = this.state.transaction_history;
        const newTransaction = new Transaction("ts-"+nanoid(), new Date(date), amount, category, description);
        newData.push(newTransaction);
        this.setState({
            transaction_history: newData
        });
        this.sortTransactions();
        saveUser(this.state);
    }

    deleteTransaction(id) {
        const remainingTransactions = this.state.transaction_history.filter(t => t.id !== id)
        this.setState({
            transaction_history: remainingTransactions
        });
        saveUser(this.state);
    }

    sortTransactions(){
        let transactions = this.state.transaction_history;
        transactions.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });
        this.setState({
            transaction_history: transactions
        });
    }

    isSignedIn() {
        return this.state.user_id !== "";
    }

    setFilter(filter) {
        this.setState({
            filter: filter
        });
    }

    getFilteredTransactions(){
        return this.state.transaction_history.filter(FILTER_MAP[this.state.filter]);
    }

    getPieChartData() {
        let data = {}
        TransactionCategory.getCategories().forEach((category) => {
            data[category] = 0
        });

        this.state.transaction_history.forEach((transaction) => {
            if(transaction.category) data[transaction.category.name] += transaction.amount
        });
        return data;
    }

    render() {
        if(this.isSignedIn()) {

            let transactions = this.getFilteredTransactions();
            let filter_buttons = FILTER_NAMES.map((filter) => {
            return (
                <button
                id={"filter" + filter}
                onClick={() => this.setFilter(filter)}
                >
                    {filter}
                </button>
            );
            });
            return (
                <div>
                    <div id="userHeader">
                        <h2>{this.state.user_id}</h2>
                        <h2>{this.state.email}</h2>
                        <button className="signOutButton" onClick={googleSignout} style={{justifySelf: "end"}}>Sign Out</button>
                    </div>
                    <h2>Filter: {this.state.filter}</h2>
                    <button onClick={() => saveUser(this.state)}>Save user</button>
                    <div id="filter-buttons">
                        {
                            filter_buttons
                        }
                    </div>
                    <h3>Total cash: ${this.getCash()}</h3>
                    <TransactionForm addTransaction={this.addTransaction}/>
                    <TransactionTableView transactions={transactions} deleteTransaction={this.deleteTransaction}/>
                    
                    <div className="charts">
                        <TransactionLineChart transactions={transactions}/>
                        <TransactionPieChart data={this.getPieChartData()} />
                    </div>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default User;