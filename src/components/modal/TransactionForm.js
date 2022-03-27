import React from "react"
import TransactionCategoryPicker from "./TransactionCategoryPicker";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { TransactionCategory } from "../../functions/transactions";

class TransactionForm extends React.Component {
    constructor(props) {
        super(props);

        if(props.initial_value){
            let t = props.initial_value;
            this.state = {
                date: t.date,
                amount: t.amount,
                category: t.category,
                description: t.description,
                validDate: true,
                validAmount: true,
                validCategory: true
            }
        } else {
            this.state = {
                date: new Date(),
                amount: 0,
                category: "",
                description: "",
                validDate: true,
                validAmount: false,
                validCategory: true,
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <form id="transaction-form" onSubmit={this.handleSubmit}>
                <label htmlFor="date">Date:</label>
                <DatePicker 
                    selected={this.state.date}
                    onChange={(date) => this.validateDate(date)}
                    className="form-control input-sm"
                    wrapperClassName="datepicker-wrapper"
                />
                <label htmlFor="amount">Amount ($):</label>
                <input 
                    type="text"
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

    reset(){
        this.setState({
            date: new Date(),
            amount: 0,
            category: "",
            description: "",
            validDate: true,
            validAmount: false,
            validCategory: true,
        });
    }

    handleChange(event) {
        this.validateField(event.target.name, event.target.value);
    }

    validateField(name, value) {
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
        if(value === "" || value === "-"){
            this.setState({
                validAmount: false,
                amount: value
            });
        }
        else if(isNaN(amt)) {
            this.setState({
                validAmount: false,
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
        // Clear form data on submit
        event.preventDefault();
        console.log("Form submitted!");
        console.dir(this.state);
        var shouldSubmit = this.shouldSubmit();

        if(shouldSubmit){
            console.log("Adding transaction!");
            console.dir(this.state);
            this.props.save(this.state.date, this.state.amount, this.state.category, this.state.description);
            this.reset();
        } else {
            alert("Some required value(s) were not filled out!");
        }
    }

    shouldSubmit() {
        return (this.state.validAmount && this.state.validCategory && this.state.validDate);
    }

    
}

export default TransactionForm;