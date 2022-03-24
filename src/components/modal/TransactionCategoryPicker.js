import React from "react";
import { TransactionCategory } from "../../functions/transactions";

class TransactionCategoryPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        this.setState({
            value: value.target.value
        });
        this.props.handleChange(value);
    }
    render() {
        let categories = TransactionCategory.getCategories()
        return (
            <label>
                Category:
                <select name="category" value={this.state.value} onChange={this.handleChange}>
                    { 
                        categories.map((category) => {
                            return (
                                <option value={category}>{category}</option>
                            );
                        })
                    }
                </select>
            </label>
        )
    }
}

export default TransactionCategoryPicker;