import React from "react";
import { Chart } from "chart.js/auto"
import { Line } from 'react-chartjs-2'


class TransactionChart extends React.Component {
    getDefaultData(){
        return {
            datasets: [
                {
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
                }
            ]};
    }

    getData() {
        let data = this.getDefaultData();
        var runningAmount = 0;
        this.props.transactions.forEach(transaction => {
            let x = transaction.getDate();
            runningAmount += transaction.amount;
            let y = runningAmount;
            data.datasets[0].data.push({x: x, y: y});
        });
        return data;
    
    }
    

    render() {
        // this.updateData();
        console.log("Chart renderring");
        return (
            <div id="transaction-chart">
                <button onClick={this.addData}>Add Data</button>
                <Line 
                options={{}}
                data={this.getData()}    
                />
            </div>
        )
    }
}

export default TransactionChart;