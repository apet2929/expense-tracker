import React from "react";
import "firebase/firestore";
import { saveUser, loadUser } from "../Firestore";
import { getAuth } from "firebase/auth";
import LoginControl from "./LoginControl";

class User extends React.Component {
    constructor() {
        super();
        this.state = {
            user_id: "",
            email: "",
            data: []
        };

        getAuth().onAuthStateChanged((user) => {
            if (user) {
                console.log("User signed in");
                var data;
                loadUser(user.uid).then((result) => {
                    data = result;
                    this.setState({
                        user_id: user.uid,
                        email: user.email,
                        data: data.data
                    })
                });
            }
        });

        this.addData = this.addData.bind(this);
        this.isSignedIn = this.isSignedIn.bind(this);
    }

    setUserId(id) {
        this.setState({
            user_id: id,
            data: this.state.data
        });
    }

    addData(data) {
        console.log(this.state.data);
        var newData = this.state.data;

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

    isSignedIn(){
        return this.state.user_id != "";
    }

    renderLoggedIn() {
        return (
            <div>
                <h2>{this.state.user_id}</h2>
                <h2>{this.state.email}</h2>
                <h2>{this.state.data}</h2>
                <button onClick={() => this.addData("Yee")}>Add data</button>
                <button onClick={() => saveUser(this.state)}>Save user</button>
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