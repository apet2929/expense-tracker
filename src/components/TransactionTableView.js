import React, { useState } from "react"
import { TransactionCategory } from "./Transaction";


function TransactionTableView(props){
    return (
        <table id="transaction-chart">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Amount ($)</th>
                    <th>Filter Category</th>
                    <th>Description (optional)</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.transactions.map((transaction) => transaction.render())
                }
                
            </tbody>
        </table>
    );
}


export default TransactionTableView;