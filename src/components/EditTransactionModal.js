import React from "react"
import Modal from "react-modal"

export default function EditTransactionModal(props) {
    let editTransaction = () => {
        let temp = props.transaction.copy();
        temp.amount = 1000;
        props.save(temp);
    }

    if(props.isOpen){
        return (
            <Modal
                isOpen={props.isOpen}
                onRequestClose={props.close}
                shouldCloseOnOverlayClick={true}
                appElement={document.getElementById("root")}
            >
                <h3>Hello, testing!</h3>
                <h1>{props.transaction.id}</h1>
                <button onClick={editTransaction}>Save</button>

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