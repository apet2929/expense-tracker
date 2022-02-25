import { googleSignin, googleSignout } from "../Auth";
import React from "react";

class LoginControl extends React.Component {
    constructor(props) {
        super(props);

        this.handleLoginClicked = this.handleLoginClicked.bind(this);
        this.handleSignoutClicked = this.handleSignoutClicked.bind(this);

    }

    handleLoginClicked() {
        let success = googleSignin();
        if(!success) {
            console.error("Sign in error!");
        }
    }

    handleSignoutClicked() {
        googleSignout();

    }

    render() {
        return (
            <div>
                <button onClick={ this.handleLoginClicked }>Sign In</button>
                <button onClick={ this.handleSignoutClicked }>Sign Out</button>
            </div>
        )
    }
}

export default LoginControl;