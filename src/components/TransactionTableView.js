import React, { useState } from "react"
import { TransactionCategory } from "./Transaction";


function TransactionTableView(props){

    function renderTransaction(transaction) {
        return (
            <tr>
                <td>{transaction.getDate()}</td>
                <td>{transaction.amount.toString()}</td>
                <td>{transaction.category.name}</td>
                <td>{transaction.description}</td>
                <td>
                    <button className="transaction-delete-button" onClick={() => props.deleteTransaction(transaction.id)}>Delete</button>
                </td>
            </tr>
        )
    }

    return (
        <table id="transaction-table">
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
                    props.transactions.map((transaction) => renderTransaction(transaction))
                }
                
            </tbody>
        </table>
    );
}


export default TransactionTableView;