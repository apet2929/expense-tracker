import React from "react"

class TransactionView extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
                <table id="transaction-chart">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Amount ($)</th>
                            <th>Category</th>
                            <th>Description (optional)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.transactions.map((transaction) => transaction.render())
                        }
                        
                    </tbody>
                </table>
        );

    }
}


export default TransactionView;