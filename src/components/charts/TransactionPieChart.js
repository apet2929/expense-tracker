import React from "react";
import { Chart } from "chart.js/auto"
import { Pie } from 'react-chartjs-2'
import { TransactionCategory } from "../../functions/transactions";

const colors = [
    "#ffadad", // red
    "#ffd6a5", // orange
    "#fdffb6", // yellow, etc
    "#caffbf",
    "#9bf6ff",
    "#a0c4ff",
    "#bdb2ff",
    "#ffc6ff",
]

function TransactionPieChart(props) {
    
    function getData(){
        
        let data = {}
        TransactionCategory.getCategories().forEach((category) => {
            data[category] = 0
        });

        props.transactions.forEach((transaction) => {
            if(transaction.category) data[transaction.category.name] += transaction.amount
        });
        
        return {
            labels: Object.keys(data),
            datasets: [
                {
                label: 'Dataset 1',
                data: Object.values(data),
                backgroundColor: colors,
                }
            ]
        };
    }

    

    let options = {
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: true,
            text: 'Spending By Category',
            }
        }
    }

    return (
        <div id="transaction-pie-chart">
            <Pie 
                className="chart-body"
                data={getData()}
                options={options}
                />
        </div>
    );

}

export default TransactionPieChart;