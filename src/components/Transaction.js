import React from "react";

export class TransactionCategory {

    static Food = new TransactionCategory("Food"); 
    static Transportation = new TransactionCategory("Transportation");
    static Entertainment = new TransactionCategory("Entertainment");
    static Work = new TransactionCategory("Work");
    static Investment = new TransactionCategory("Investment");
    static Misc = new TransactionCategory("Miscellaneous");

    constructor(name){
        this.name = name;
    }

    static FromName(name) {
        for(const category of Object.values(TransactionCategory)) {
            if(name === category.name){
                return category;
            }
        }
    }

    static getCategories() {
        let categories = [];
        Object.keys(TransactionCategory).forEach((category) => {
            categories.push(category);
        });
        return categories;
    }
}

class Transaction {

    constructor(id, date, amount, category, description) {
        this.id = id;
        this.date = date;
        this.amount = amount;
        this.category = category;
        this.description = description;

    }

    getDate(){
        var iso = this.date.toISOString();
        return iso.substring(0, iso.indexOf('T'));
    }

    render() {
        return (
            <tr>
                <td>{this.getDate()}</td>
                <td>{this.amount.toString()}</td>
                <td>{this.category.name}</td>
                <td>{this.description}</td>
                <td>
                    <button>Delete</button>
                </td>
            </tr>
        )
    }
}

export default Transaction;