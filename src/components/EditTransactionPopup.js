import { findAllByTestId } from "@testing-library/react";
import React, { useState } from "react";
import { render } from "react-dom";
import ReactModal from "react-modal";

class EditTransactionPopup extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            showModal: false
        }
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal() {
        this.setState({
            showModal: true
        });
    }

    handleCloseModal(){
        this.setState({
            showModal: false
        });
    }

    render() {
        return(
        <div>
            <button onClick={this.handleOpenModal}>Trigger Modal</button>
            <ReactModal 
            isOpen={this.state.showModal}
            contentLabel="Minimal Modal Example"
            preventScroll={true}
            >
                
                <button onClick={this.handleCloseModal}>Close Modal</button>
            </ReactModal>
        </div>
        )
    }
}

export default EditTransactionPopup;