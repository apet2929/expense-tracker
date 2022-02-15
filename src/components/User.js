import React from "react";
import "firebase/firestore";
import { saveUser, loadUser } from "../Firestore";
import { getAuth } from "firebase/auth";
import LoginControl from "./LoginControl";
import TransactionTableView from "./TransactionTableView";
import Transaction, { TransactionCategory } from "./Transaction";
import TransactionForm from "./TransactionForm";
import TransactionGraphView from "./TransactionGraphView";


class User extends React.Component {
    constructor() {
        super();

        this.state = {
            user_id: "",
            email: "",
            transaction_history: []
        };
    }

    componentDidMount() {
        this.addTransaction = this.addTransaction.bind(this);
        this.isSignedIn = this.isSignedIn.bind(this);

        let history = [
            new Transaction(new Date(), -15, TransactionCategory.Transportation, "Bought gas")
        ];
        getAuth().onAuthStateChanged((user) => {
            if (user) {
                console.log("User signed in");
                var data;
                loadUser(user.uid).then((result) => {
                    data = result;
                    // let th = this.loadTransactions(data.transaction_history);
                    // console.dir(th);
                    this.setState({
                        user_id: user.uid,
                        email: user.email,
                        // transaction_history: th 
                        transaction_history: history
                    });
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
            history.push(new Transaction(new Date(obj.date), obj.amount, obj.category, obj.description));
        }
        return history;
    }

    addTransaction(date, amount, category, description) {
        console.log(this.state.transaction_history);
        var newData = this.state.transaction_history;
        const newTransaction = new Transaction(new Date(date), amount, category, description);
        newData.push(newTransaction);
        this.setState({
            transaction_history: newData
        });
    }

    isSignedIn() {
        return this.state.user_id != "";
    }

    renderLoggedIn() {
        return (
            <div>
                <h2>{this.state.user_id}</h2>
                <h2>{this.state.email}</h2>
                <button onClick={() => this.addTransaction("Yee")}>Add data</button>
                <button onClick={() => saveUser(this.state)}>Save user</button>
                <TransactionForm addTransaction={this.addTransaction}/>
                <TransactionTableView transactions={this.state.transaction_history}/>
                <h3>Total cash: ${this.getCash()}</h3>
                <TransactionGraphView transactions={this.state.transaction_history}/>
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