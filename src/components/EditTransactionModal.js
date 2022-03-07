import React from "react";
import ReactModal from "react-modal";


class EditTransactionModal extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        showModal: false,
        testVal: "yee"
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleOpenModal = this.handleOpenModal.bind(this);
      this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    componentWillMount() {
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        ReactModal.setAppElement('#root');
    }

    handleChange(event) {
        if(event.target.name === "testVal") {
            this.setState({
                testVal: event.target.value
            });
        }
        this.props.handleChange(event);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.handleSubmit(event);
        this.handleCloseModal();
    }
    
    handleOpenModal () {
      this.setState({ showModal: true });
    }
    
    handleCloseModal () {
      this.setState({ showModal: false });
    }
    
    render () {
      return (
        <div>
          <h1>{this.state.testVal}</h1>
          <button onClick={this.handleOpenModal}>Trigger Modal</button>
          <ReactModal 
             isOpen={this.state.showModal}
             contentLabel="Minimal Modal Example"
             appElement={document.getElementById("App")}
          >
            <button onClick={this.handleCloseModal}>Close Modal</button>
            <h1>{this.state.testVal}</h1>
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="testVal">testVal: </label>    
                <input type="text" value={this.state.testVal} onChange={this.handleChange} name="testVal" />
                <button type="submit">Submit</button>
            </form>
          </ReactModal>
        </div>
      );
    }
}

export default EditTransactionModal;