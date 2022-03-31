import {useState} from "react"
export default function SortButton(props) {
    const INACTIVE = 0
    const ASCENDING = 1
    const DESCENDING = 2

    let buttonText;
    if (props.direction === INACTIVE) buttonText = "⇑⇓"
    else if (props.direction === ASCENDING) buttonText = "⇑"
    else if (props.direction === DESCENDING) buttonText = "⇓"
    return (
        <button className="tableSortButton" onClick={props.onClick}>
            <h4>{buttonText}</h4>
        </button>
    );
}