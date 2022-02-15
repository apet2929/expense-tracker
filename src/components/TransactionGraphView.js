import React from "react";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'


class TransactionGraphView extends React.Component {
    constructor(props) {
        super(props);

        // let data = this.getData(this.props.transactions);
        // let labels = this.getLabels(this.props.transactions);


        this.data = {
            datasets: [{
                label: 'Total Cash',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [{x:'2016-12-25', y:20}, {x:'2016-12-26', y:10}]
              }]
        };

        // console.log(data);
        // this.datasets = [
        //     {
        //         label: 'Total Cash',
        //         fill: false,
        //         lineTension: 0.5,
        //         backgroundColor: 'rgba(75,192,192,1)',
        //         borderColor: 'rgba(0,0,0,1)',
        //         borderWidth: 2,
        //         data: data
        //     }
        // ];

        // this.chartConfig = {
        //     type: "line",
        //     data: {
        //         datasets: [{
        //                 data: data
        //         }]
        //     }
        // };
    }

    getData(transactions) {
        let data = [];
        let runningAmount = 0;
        transactions.forEach((transaction) => {
            runningAmount += transaction.amount
            data.push({x: transaction.getDate(), y: runningAmount});
        });
        return data;
    }
    
    getLabels(transactions) {
        let labels = [];
        transactions.forEach((transaction) => {
            labels.push(this.getLabel(transaction));
        });
        return labels;
    }

    getLabel(transaction) {
        return `Category: ${transaction.category}`
    }

    render(){
        return (
            <div>
                <Chart
                    type="line"
                    data={this.data}
                    options={{
                        title:{
                        display:true,
                        text:'Cash',
                        fontSize:20,
                        },
                        legend:{
                        display:true,
                        position:'right',
                        }
                    }}
                />
            </div>
        );
    }
}

export default TransactionGraphView;