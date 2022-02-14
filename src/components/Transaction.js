import React from "react";

class Transaction {

    constructor(date, amount, category, description) {
        this.date = date;
        this.amount = amount;
        this.category = category;
        this.description = description;
    }

    render() {
        return (
            <tr>
                <td>{this.date.toString()}</td>
                <td>{this.amount.toString()}</td>
                <td>{this.category}</td>
                <td>{this.description}</td>
            </tr>
        )
    }
}

export default Transaction;