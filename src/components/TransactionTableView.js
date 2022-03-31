import { useState } from "react"
import SortButton from "./SortButton";

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
                return a.date - b.date
            }, 
            (a, b) => {
                return b.date - a.date
            }
        ],
        "amount": [
            (a, b) => {
                return a.amount - b.amount
            }, 
            (a, b) => {
                return b.amount - a.amount
            }
        ],
        "category": [
            (a, b) => {
                return a.category.name.localeCompare(b.category.name);
            }, 
            (a, b) => {
                return b.category.name.localeCompare(a.category.name);
            }
        ]
    };

    let [sortBy, setSortBy] = useState("none");
    let [sortAscending, setSortAscending] = useState(true);
    let sortType = sortFunctions[sortBy];
    let sortFunction = sortType[sortAscending ? 0 : 1];
    let sorted_transactions = props.transactions.sort(sortFunction);
    console.log("Sorting transactions!", sortFunction);
    console.log(sortFunctions[sortBy], sortAscending ? 0 : 1);
    let transactions_html = sorted_transactions.map(toTableComponent);
    let ascendingState = sortAscending ? 1 : 2;
    return (
        <div className="transactionsBox">
            <div className="transactions">
                <table className="transactionTable">
                    <thead>
                        <tr>
                            <th>
                                <p> Date </p>
                                <SortButton direction={sortBy==="date" ? ascendingState : 0} onClick={
                                    () => {
                                        setSortBy("date")
                                        setSortAscending(!sortAscending)
                                    }
                                }/>
                            </th>
                            <th>
                                <p> Amount </p>
                                <SortButton direction={sortBy==="amount" ? ascendingState : 0} onClick={
                                    () => {
                                        setSortBy("amount")
                                        setSortAscending(!sortAscending)
                                    }
                                }/>
                            </th>
                            <th>
                                <p> Category </p>
                                <SortButton direction={sortBy==="category" ? ascendingState : 0} onClick={
                                    () => {
                                        setSortBy("category")
                                        setSortAscending(!sortAscending)
                                    }
                                }/>
                            </th>
                            <th> Description </th>
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
