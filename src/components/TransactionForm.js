import React from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";
import { TransactionCategory } from "./Transaction";
import TransactionCategoryPicker from "./TransactionCategoryPicker";

class TransactionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            amount: 1500,
            category: "Test",
            description: "",
            validDate: false,
            validAmount: false,
            validCategory: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.validateField(event.target.name, event.target.value);
    }

    shouldSubmit() {
        return (this.state.validAmount && this.state.validCategory && this.state.validDate);
    }

    validateField(name, value) {
        let validAmount = this.state.validAmount;
        let validDate = this.state.validDate;
        let validCategory = this.state.validCategory;
        console.log(`Validating form field ${name} with value ${value}`);
        switch(name) {
            case "amount": {
                this.validateAmount(value);
                break;
            } 
            case "category": {
                this.validateCategory(value);
                break
            } 
            default: {
                this.setState({
                    description: value
                });
                break;
            }
        }
        console.log(`New form state:`);
        console.dir(this.state);
    }
    
    validateDate(value) {
        this.setState({
            date: value,
            validDate: true
        });
    }

    validateAmount(value) {
        let amt = Number.parseFloat(value);
        if(isNaN(amt)) {
            this.setState({
                validAmount: false
            });
        } else {
            this.setState({
                validAmount: true,
                amount: amt
            });
        }
    }

    validateCategory(value) {
        // TODO : Implement Category Enum
        let category = TransactionCategory.FromName(value);
        this.setState({
            validCategory: true,
            category: category
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("Form submitted!");
        console.dir(this.state);
        var shouldSubmit = this.shouldSubmit();

        if(shouldSubmit){
            console.log("Adding transaction!");
            console.dir(this.state);
            this.props.addTransaction(this.state.date, this.state.amount, this.state.category, this.state.description);
        } else {
            alert("Some required value(s) were not filled out!");
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="date">Date:</label>
                <DatePicker 
                    selected={this.state.date}
                    onChange={(date) => this.validateDate(date)}
                    className="form-control input-sm"
                />
                <label htmlFor="amount">Amount ($):</label>
                <input 
                    type="number"
                    name="amount"
                    onChange={(e) => this.handleChange(e)}
                    value={this.state.amount}
                />
                <TransactionCategoryPicker handleChange={this.handleChange}/>
                <label htmlFor="description">Description (optional):</label>
                <input 
                    type="text"
                    name="descripton"
                    placeholder=""
                    onChange={(e) => this.handleChange(e)}
                    value={this.state.description}
                />
                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default TransactionForm;