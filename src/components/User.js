import React from "react";
import "firebase/firestore";
import { saveUser, loadUser } from "../Firestore";
import { getAuth } from "firebase/auth";
import LoginControl from "./LoginControl";
import TransactionView from "./TransactionView";
import Transaction from "./Transaction";
import TransactionForm from "./TransactionForm";

class User extends React.Component {
    constructor() {
        super();
        let default_transactions = [
            new Transaction(new Date(), 1500, "Poo", "I shidd"),
            new Transaction(new Date(), 2400, "Food", "Sophia and I went out to eat")
        ]
        this.state = {
            user_id: "",
            email: "",
            transaction_history: default_transactions
        };

        this.addTransaction = this.addTransaction.bind(this);
        this.isSignedIn = this.isSignedIn.bind(this);
        getAuth().onAuthStateChanged((user) => {
            if (user) {
                console.log("User signed in");
                var data;
                loadUser(user.uid).then((result) => {
                    data = result;
                    let th = this.loadTransactions(data.transaction_history);
                    console.dir(th);
                    this.setState({
                        user_id: user.uid,
                        email: user.email,
                        transaction_history: th 
                    })
                });
            }
        });
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
                <TransactionView transactions={this.state.transaction_history}/>
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