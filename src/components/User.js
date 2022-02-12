import React from "react";
import "firebase/firestore";
import { printUsers, addUser } from "../Firestore";

class User extends React.Component {
    constructor() {
        super();
        this.state = {
            user_id: "",
            email: ""
        };

        this.addUser = e => {
            e.preventDefault();
            addUser(this.state);

            this.setState({
                user_id: "",
                email: ""
            });
        }

    }

    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    render() {
        return (
            <div>
                <h2>{this.state.email}</h2>
                <h2>{this.state.user_id}</h2>
                <button
                onClick={printUsers}>
                    Print Users</button>
                <form onSubmit={this.addUser}>
                    <input 
                    type="text"
                    name="user_id"
                    placeholder="Username"
                    onChange={this.updateInput}
                    value={this.state.user_id}
                    />
                    <input 
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={this.updateInput}
                    value={this.state.email}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default User;