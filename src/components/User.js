import React from "react";
import "firebase/firestore";
import { saveUser, loadUser } from "../Firestore";
import { getAuth } from "firebase/auth";
import LoginControl from "./LoginControl";
import TransactionView from "./TransactionView";
import Transaction from "./Transaction";

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

        getAuth().onAuthStateChanged((user) => {
            if (user) {
                console.log("User signed in");
                var data;
                loadUser(user.uid).then((result) => {
                    data = result;
                    this.setState({
                        user_id: user.uid,
                        email: user.email
                        // transaction_history: data.transaction_history ? data.transaction_history : []
                    })
                });
            }
        });

        this.addData = this.addData.bind(this);
        this.isSignedIn = this.isSignedIn.bind(this);
    }

    addData(data) {
        console.log(this.state.transaction_history);
        var newData = this.state.transaction_history;

        newData.push(data);
        this.setState({
            data: newData
        });
    }

    updateInput = e => {
        if(e.target.name === "user_id") {
            this.setUserId(e.target.value);
        } else if(e.target.name === "data") {
            this.addData(e.target.value)
        }
    }

    isSignedIn() {
        return this.state.user_id != "";
    }

    renderLoggedIn() {
        return (
            <div>
                <h2>{this.state.user_id}</h2>
                <h2>{this.state.email}</h2>
                <button onClick={() => this.addData("Yee")}>Add data</button>
                <button onClick={() => saveUser(this.state)}>Save user</button>
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