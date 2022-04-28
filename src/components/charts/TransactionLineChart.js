import React from "react";
import { Line } from 'react-chartjs-2'
import { enUS } from "date-fns/locale"
import differenceInDays from "date-fns/differenceInDays"
import "chartjs-adapter-date-fns"

class TransactionLineChart extends React.Component {
    
    getDefaultData(){
        return {
            label: "Total Cash",
            datasets: [
                {
                    label: "Total Cash",
                data: [],
                
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
        this.props.transactions.sort((a,b) => {return a.date - b.date}).forEach(transaction => {
            if(this.props.options.dateMin && transaction.date > this.props.options.dateMin){
                let x = transaction.getDate();

                runningAmount += transaction.amount;
                let y = runningAmount;
                data.datasets[0].data.push({x: x, y: y});
            }
        });
        return data;
    
    }

    getTimeStep() {
        let len = this.props.transactions.length;
        if(len !== 0){
            
            let timeRange = differenceInDays(this.props.transactions[0].date, this.props.transactions[len - 1].date)
            let timeStep = timeRange / len * 1.5;
            console.log(timeRange)
            return 5;
        }
        return 1;
    }

    render() {
        let data = this.getData();
        console.log(data);
        let timeFormat = "YYYY-MM-DD"
        let timeStep = this.getTimeStep()
        let options = {
                scales: {
                    x: {
                        type: "time",
                        time: {
                            format: timeFormat,
                        },
                        scaleLabel: {
                            display:     true,
                            labelString: 'Date'
                        },
                        adapters: {
                            date: {
                                locale: enUS
                            }
                        }
                    },
                    y: {
                        scaleLabel: {
                            display:     true,
                            labelString: 'value'
                        }
                    },
                    
                }
        }
        
        return (
            <div className="chart-container" id="transaction-line-chart">
                <Line 
                className="chart-body"
                options={options}
                data={data}    
                />
            </div>
        )
    }
}

export default TransactionLineChart;