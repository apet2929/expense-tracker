import { useState } from "react"
import TransactionLineChart from "./TransactionLineChart";
import TransactionPieChart from "./TransactionPieChart";

export default function TransactionChartView(props){

    let [chartType, setChartType] = useState(false);

    function isLineChart(chartType) {
        if(chartType === true) return true;
        return false;
    }

    function renderLineChart(transactions){
        return (
            <div className="chart line">
                <TransactionLineChart transactions={transactions} options={{
                    dateMin: new Date(2021, 1, 1)
                }}/>
            
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