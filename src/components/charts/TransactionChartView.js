import { useState } from "react"
import { useRef } from "react/cjs/react.production.min";
import TransactionLineChart from "./TransactionLineChart";
import TransactionPieChart from "./TransactionPieChart";
import { formatISO9075 } from "date-fns";

export default function TransactionChartView(props){

    let [chartType, setChartType] = useState(false);
    let today = new Date()
    let lastYear = new Date(today.getFullYear() - 1, today.getMonth())
    let [dateMin, setDateMin] = useState(lastYear);

    function incDateMin(incrementYears, incrementMonths) {
        setDateMin(new Date(dateMin.getFullYear() + incrementYears, dateMin.getMonth() + incrementMonths));
    }

    function isLineChart(chartType) {
        if(chartType === true) return true;
        return false;
    }

    function renderLineChart(transactions){
        return (
            <div className="chart line">
                <div id="chart buttonContainer">
                    <button onClick={() => incDateMin(1, 0)}>+1 year</button>
                    <button onClick={() => incDateMin(0, 1)}>+1 month</button>
                    <p> {formatISO9075(dateMin)}</p>
                    <button onClick={() => incDateMin(0, -1)}>-1 month</button>
                    <button onClick={() => incDateMin(-1, 0)}>-1 year</button>
                </div>
                <TransactionLineChart transactions={transactions} options={{
                    dateMin: dateMin
                }}/>
            
            </div>
        )
    }
    function renderPieChart(transactions){
        return (
            <div className="chart pie">
                <TransactionPieChart transactions={transactions} />
            </div>
        )
    }

    function renderButtons(){
        return (
            <div className="buttonContainer">
                <button className="styledButton2" onClick={() => setChartType(!chartType)}>Change</button>
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