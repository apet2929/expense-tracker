import React from "react";
import {SignInButton, SignOutButton} from "../Auth"
import logo from "../assets/btc-logo.png";
import "../App.css"

export default function UserHeader(props) {
    let {username, pfp_url} = props;
    if(username) {
        return (
            <header>
                <table className="headerTbl">
                    <tbody>
                        <tr>
                            <td>
                                <img className="logoImg" src={logo} alt="logo" />
                            </td>
                            <td>
                                <h1 className="title">Expense Tracker</h1>
                            </td>
                            <td>
                                <div id="userHeaderContainer">
                                    <p>{username}</p>
                                    <SignOutButton />
                                </div>
                                
                            </td>
                        </tr>
                    </tbody>
                </table>
            </header>
        )
    }
    // User is not signed in
    return (
        <header>
            <table className="headerTbl">
                <tr>
                    <td>
                        <img className="logoImg" src="assets/logo.png" alt="logo" />
                    </td>
                    <td>
                        <h1 className="title">Expense Tracker</h1>
                    </td>
                    <td>
                        <SignInButton />
                    </td>
                </tr>
            </table>
        </header>
    )
}