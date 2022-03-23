import { useState } from "react"
import TransactionPieChart from "./charts/TransactionPieChart";

export default function TransactionChartView(props){

    let [chartType, setChartType] = useState(false);

    function isLineChart(chartType) {
        if(chartType === true) return true;
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
                <TransactionPieChart transactions={props.transactions} />
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