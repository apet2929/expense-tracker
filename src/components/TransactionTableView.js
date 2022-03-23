
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
    let transactions = props.transactions;
    let transactions_html = transactions.map(toTableComponent);
    return (
        <div className="transactionsBox">
            <div className="transactions">
                <table className="transactionTable">
                    <thead>
                        <tr>
                            <th>Date</th>
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
