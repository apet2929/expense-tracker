import { useState } from "react"

export default function TransactionChartView(props){

    let [chartType, setChartType] = useState(false);

    function isLineChart(chartType) {
        if(chartType == true) return true;
        return false;
    }

    function renderLineChart(transactions){
        return (
            <div className="chart line">
                <h3>Line Chart!</h3>
            </div>
        )
    }
    function renderPieChart(transactions){
        return (
            <div className="chart pie">
                <h3>Pie chart!</h3>
            </div>
        )
    }

    function renderButtons(){
        return (
            <div className="buttonContainer">
                <button onClick={() => setChartType(!chartType)}>Change</button>
            </div>
        )
    }
    
    return (
        <div className="chartsBox">
            { renderButtons() }
            { isLineChart(chartType) ? renderLineChart(props.transactions) : renderPieChart(props.transactions) }
        </div>
    )
}