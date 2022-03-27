import { Transaction } from "../../functions/transactions";
import React from "react"
import Modal from "react-modal"
import TransactionForm from "./TransactionForm";

function EditTransactionModal(props) {

    let handleSubmit = (date, amount, category, description) => {
        console.log("Handling submit!");
        console.log(date, amount, category, description);
        let transaction;
        if(props.transaction){
            transaction = new Transaction(props.transaction.id, date, amount, category, description);
        } else {
            transaction = new Transaction("", date, amount, category, description);
        }
        console.log("Submitted Transaction, saving now.",transaction);
        props.save(transaction)
    }

    if(props.isOpen){
        let headerText = props.transaction ? "Edit Transaction" : "Create New Transaction";
        return (
            <Modal
                isOpen={props.isOpen}
                onRequestClose={props.close}
                shouldCloseOnOverlayClick={true}
                appElement={document.getElementById("root")}
            >
                <h3> {headerText} </h3>
                <button onClick={props.close}>X</button>
                <TransactionForm initial_value={props.transaction} save={handleSubmit}/>
            </Modal>
        );
    } else {
        return (
            <Modal
                isOpen={props.isOpen}
                onRequestClose={props.close}
                shouldCloseOnOverlayClick={true}
                appElement={document.getElementById("root")}
            ></Modal>
        )
    }
}

export default EditTransactionModal;