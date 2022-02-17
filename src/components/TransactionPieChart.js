import React from "react";
import { Chart } from "chart.js/auto"
import { Pie } from 'react-chartjs-2'

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
    function getChartData(){
        return {
            labels: Object.keys(props.data),
            datasets: [
                {
                label: 'Dataset 1',
                data: Object.values(props.data),
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
                text: 'Spending By Category'
              }
            }
    }

    return (
        <div id="transaction-line-chart">
            <Pie 
                data={getChartData()}
                options={options}
                />
        </div>
    );

}

export default TransactionPieChart;
