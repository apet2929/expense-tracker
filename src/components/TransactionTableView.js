import { useState } from "react"

export default function TransactionTableView(props){
    let toTableComponent = (transaction) => {
        return (
            <tr key={transaction.id} id={"table-"+transaction.id}>
                <td>{transaction.getDate()}</td>
                <td>${transaction.amount}</td>
                <td>{transaction.category.name}</td>
                <td>{transaction.description}</td>
    
                <td>
                    <button onClick={() => props.editTransaction(transaction.id)}>Edit</button>
                    <button onClick={() => props.deleteTransaction(transaction.id)}>Delete</button>
                </td>
            </tr>
        )
    };
    
    

    let sortFunctions = {
        "none": [
            (a, b) => {return 0},
            (a, b) => {return 0}
        ],
        "date": [
            (a, b) => {
                return b.date - a.date
            }, 
            (a, b) => {
                return a.date - b.date
            }
        ]
    };

    

    let [sortBy, setSortBy] = useState("none");
    let [sortAscending, setSortAscending] = useState(true);
    let sortType =  sortFunctions[sortBy];
    let sortFunction = sortType[sortAscending ? 0 : 1];
    let sorted_transactions = props.transactions.sort(sortFunction);
    console.log("Sorting transactions!", sortFunction);
    console.log(sortFunctions[sortBy], sortAscending ? 0 : 1);
    let transactions_html = sorted_transactions.map(toTableComponent);

    return (
        <div className="transactionsBox">
            <div className="transactions">
                <table className="transactionTable">
                    <thead>
                        <tr>
                            <th>
                                <p> Date </p>
                                <button className="tableSortButton" onClick={() => {
                                    setSortBy("date");
                                    setSortAscending(!sortAscending);
                                    }}>
                                    <img src="src\assets\btc-logo.png" className="tableSortImage" alt="Sort By Date Ascending/Descending" />
                                </button>
                            </th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th id="transaction_actions">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions_html}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
