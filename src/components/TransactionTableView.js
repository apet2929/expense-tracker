
function toTableComponent(transaction){
    return (
        <tr id={"table-"+transaction.id}>
            <td>{transaction.date}</td>
            <td>{transaction.amount}</td>
            <td>{transaction.category.name}</td>
            <td>{transaction.description}</td>
            <td><button>Edit</button></td>
        </tr>
    )
}

export default function TransactionTableView(props){
    let transactions = props.transactions;
    let transactions_html = transactions.map(toTableComponent);
    return (
        <div class="transactionsBox">
            <div class="transactions">
                <table class="transactionTable">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th colSpan="2">Description</th>
                            <th id="transaction_actions">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions_html}
                        <tr>
                            <td>2day</td>
                            <td>a lot</td>
                            <td>yum</td>
                            <td colspan="2">was hungy. not anymor</td>
                            <td><button>Edit</button></td>
                        </tr>    
                        <tr>
                            <td>2/2/2222</td>
                            <td>$2222</td>
                            <td>Food</td>
                            <td colspan="2">was hungy, not anymor</td>
                            <td><button>Edit</button></td>
                        </tr>
                        <tr>
                            <td>2/2/2222</td>
                            <td>$2222</td>
                            <td>Food</td>
                            <td colspan="2">was hungy, not anymor</td>
                            <td><button>Edit</button></td>
                        </tr>
                        <tr>
                            <td>2/2/2222</td>
                            <td>$2222</td>
                            <td>Food</td>
                            <td colspan="2">was hungy, not anymor</td>
                            <td><button>Edit</button></td>
                        </tr>
                        <tr>
                            <td>2/2/2222</td>
                            <td>$2222</td>
                            <td>Food</td>
                            <td colspan="2">was hungy, not anymor</td>
                            <td><button>Edit</button></td>
                        </tr>
                        <tr>
                            <td>2/2/2222</td>
                            <td>$2222</td>
                            <td>Food</td>
                            <td colspan="2">was hungy, not anymor</td>
                            <td><button>Edit</button></td>
                        </tr>
                        <tr>
                            <td>2/2/2222</td>
                            <td>$2222</td>
                            <td>Food</td>
                            <td colspan="2">was hungy, not anymor</td>
                            <td><button>Edit</button></td>
                        </tr>
                        <tr>
                            <td>2/2/2222</td>
                            <td>$2222</td>
                            <td>Food</td>
                            <td colspan="2">was hungy, not anymor</td>
                            <td><button>Edit</button></td>
                        </tr>
                        <tr>
                            <td>2/2/2222</td>
                            <td>$2222</td>
                            <td>Food</td>
                            <td colspan="2">was hungy, not anymor</td>
                            <td><button>Edit</button></td>
                        </tr>
                        <tr>
                            <td>2/2/2222</td>
                            <td>$2222</td>
                            <td>Food</td>
                            <td colspan="2">was hungy, not anymor</td>
                            <td><button>Edit</button></td>
                        </tr>
                        <tr>
                            <td>2/2/2222</td>
                            <td>$2222</td>
                            <td>Food</td>
                            <td colspan="2">was hungy, not anymor</td>
                            <td><button>Edit</button></td>
                        </tr>
                        <tr>
                            <td>2/2/2222</td>
                            <td>$2222</td>
                            <td>Food</td>
                            <td colspan="2">was hungy, not anymor</td>
                            <td><button>Edit</button></td>
                        </tr>
                        <tr>
                            <td>2/2/2222</td>
                            <td>$2222</td>
                            <td>Food</td>
                            <td colspan="2">was hungy, not anymor</td>
                            <td><button>Edit</button></td>
                        </tr>
                        <tr>
                            <td>2/2/2222</td>
                            <td>$2222</td>
                            <td>Food</td>
                            <td colspan="2">was hungy, not anymor</td>
                            <td><button>Edit</button></td>
                        </tr>
                        <tr>
                            <td>2/2/2222</td>
                            <td>$2222</td>
                            <td>Food</td>
                            <td colspan="2">was hungy, not anymor</td>
                            <td><button>Edit</button></td>
                        </tr>
                        <tr>
                            <td>2/2/2222</td>
                            <td>$2222</td>
                            <td>Food</td>
                            <td colspan="2">was hungy, not anymor</td>
                            <td><button>Edit</button></td>
                        </tr>
                        <tr>
                            <td>2/2/2222</td>
                            <td>$2222</td>
                            <td>Food</td>
                            <td colspan="2">was hungy, not anymor</td>
                            <td><button>Edit</button></td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
}