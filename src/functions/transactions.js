import { loadUser } from "../Firestore";

export class TransactionCategory {

    static Food = new TransactionCategory("Food"); 
    static Transportation = new TransactionCategory("Transportation");
    static Entertainment = new TransactionCategory("Entertainment");
    static Work = new TransactionCategory("Work");
    static Investment = new TransactionCategory("Investment");
    static Misc = new TransactionCategory("Misc");

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

export class Transaction {
    constructor(id, date, amount, category, description) {
        this.id = id;
        this.date = date;
        this.amount = amount;
        this.description = description;
        this.category = category;

        if(typeof category == "string")  {
            this.category = TransactionCategory.FromName(category);
        } 
    }

    getDate(){
        var iso = this.date.toISOString();
        return iso.substring(0, iso.indexOf('T'));
    }

    validate() {
        return (this.id && this.date && this.amount && this.category);
    }

}

export function loadUserTransactions(user_id) {
    loadUser(user_id).then((user) => {
        let raw_json = JSON.parse(user.transaction_history);
        var history = [];
        console.log("Parsing transactions!");
        console.dir(raw_json);
        for (const obj of raw_json) {
            console.dir(obj);
            let t = new Transaction(obj.id, new Date(obj.date), obj.amount, obj.category, obj.description);
            if(t.validate()) {
                history.push(t);
            }
        }
        
        return history;
    }, (err) => {
        console.error(`Failed to load user transactions! \nError: ${err}`)
        return null;
    })

}

export function addTransaction(user_id, transaction){

}

export function editTransaction(user_id, old_transaction, new_transaction){

}

export function sumTransactionsAmount(transactions) {
    let cash = 0;
    transactions.forEach((transaction) => {
        cash += transaction.amount;
    });
    return cash;
}
