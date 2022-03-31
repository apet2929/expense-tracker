import React from "react";
import {SignInButton} from "../Auth"
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
                                <p>{username}</p>
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