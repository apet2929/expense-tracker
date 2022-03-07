import React from "react";
import { Chart } from "chart.js/auto"
import { Line } from 'react-chartjs-2'


class TransactionLineChart extends React.Component {
    getDefaultData(){
        return {
            label: "Total Cash",
            datasets: [
                {
                    label: "Total Cash",
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

    getTimeStep() {
        let len = this.props.transactions.length;
        if(len != 0){
            let timeRange = this.props.transactions[len-1].date - this.props.transactions[0].date;
            let timeStep = timeRange / len * 1.5;
            console.log(timeStep)
            // let timeRange = this.props.transactions[this.props.transactions.length - 1].date - this.props.transactions[0].date
            // let timeStep = timeRange / this.props.transactions.length * 1.5;
            return timeStep;
        }
        return 1;
    }

    render() {
        // this.updateData();
        console.log("Line Chart renderring");
        let timeStep = this.getTimeStep()

        return (
            <div class="chart-container" id="transaction-line-chart">
                <Line 
                className="chart-body"
                options={
                    {
                    scales: {
                        y: {
                          beginAtZero: true
                        },
                        x: {
                            ticks: {
                                stepSize: timeStep
                            }
                        }
                    }
                }}
                data={this.getData()}    
                />
            </div>
        )
    }
}

export default TransactionLineChart;