import React from "react";
import "firebase/firestore";
import { saveUser, loadUser } from "../Firestore";
import { getAuth } from "firebase/auth";
import LoginControl from "./LoginControl";
import TransactionTableView from "./TransactionTableView";
import Transaction, { TransactionCategory } from "./Transaction";
import TransactionForm from "./TransactionForm";
import TransactionChart from "./TransactionChart";
import { nanoid } from "nanoid";


const FILTER_MAP = {
    All: () => true,
    Food: (transaction) => transaction.category.name === TransactionCategory.Food.name,
    Transportation: (transaction) => transaction.category.name === TransactionCategory.Transportation.name,
    Entertainment: (transaction) => transaction.category.name === TransactionCategory.Entertainment.name,
    Investment: (transaction) => transaction.category.name === TransactionCategory.Investment.name,
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
            filter: "Food"
        };
    }

    componentDidMount() {
        this.addTransaction = this.addTransaction.bind(this);
        this.isSignedIn = this.isSignedIn.bind(this);

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
            }
        });
    }

    getCash(dateFilter=null) {
        let skipDateCheck = false;
        if(dateFilter == null) skipDateCheck = true;
        var cash = 0;
        this.state.transaction_history.forEach((transaction) => {
            if(skipDateCheck || transaction.date <= dateFilter) {
                cash += transaction.amount;
            } else {
                console.log(`Date check failed! Date filter: (${dateFilter}) Transaction date: (${transaction.date})`);
            }
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
        return this.state.user_id != "";
    }

    setFilter(filter) {
        this.setState({
            filter: filter
        });
    }

    renderLoggedIn() {
        let transactions = this.state.transaction_history.filter(FILTER_MAP[this.state.filter]);
        console.dir(transactions);

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
                <h2>{this.state.user_id}</h2>
                <h2>{this.state.email}</h2>
                <button onClick={() => saveUser(this.state)}>Save user</button>
                <div id="filter-buttons">
                    {
                        filter_buttons
                    }
                </div>
                <TransactionForm addTransaction={this.addTransaction}/>
                <TransactionTableView transactions={transactions}/>
                <h3>Total cash: ${this.getCash()}</h3>
                <TransactionChart transactions={transactions}/>
            </div>
        )
    }

    renderNotLoggedIn() {
        return(
            <div>
                <LoginControl />
                <p>You are not logged in!</p>
            </div>
        );
    }

    render() {
        if(this.isSignedIn()) {
            return this.renderLoggedIn();
        } else {
            return this.renderNotLoggedIn();
        }
    }
}

export default User;