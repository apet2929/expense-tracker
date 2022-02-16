import React from "react";
import { Chart } from "chart.js/auto"
import { Line } from 'react-chartjs-2'


class TransactionChart extends React.Component {
    constructor(props) {
        super(props);

        const data = 
{
    labels: ["Yee", "Yee 2", "Yee 3", "Yee 4", "Yee 5", "Yee 6"],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
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
    ]
}
        this.state = {
            data: data
        };
        this.chart = null;
        this.handleChange = this.handleChange.bind(this);
        this.addData = this.addData.bind(this);
    }

    handleChange() {
        console.log("Updating");
        this.chart.update();
    }

    addData(){
        let data = this.state.data;
        data.datasets[0].data.push(Math.random()*15);
        data.labels.push("Yee");
        console.log("Adding data");
        this.setState({
            data: data
        });
    }


    render(){
        return (
            <div>
                <button onClick={this.addData}>Add Data</button>
                <Line 
                options={{}}
                data={this.state.data}
                onChange={this.handleChange}
                ref={this.chart}       
                />
            </div>
        )
    }
}

export default TransactionChart;