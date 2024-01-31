import React, { Component } from "react";
import './expenses.css';

class Expenses extends Component {
  constructor(props) {
    super(props);

    // Загружаем данные из локального хранилища
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];

    this.state = {
      expenses: savedExpenses,
      newExpense: {
        id: 0,
        description: "",
        amount: "",
        category: "",
        date: ""
      },
      categories: JSON.parse(localStorage.getItem("categories")) || [],
    };
  }

  componentDidUpdate() {
    // Сохраняем данные в локальное хранилище при обновлении компонента
    localStorage.setItem("expenses", JSON.stringify(this.state.expenses));
  }

  

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      newExpense: {
        ...prevState.newExpense,
        [name]: value
      }
    }));
  }

  handleAddExpense = () => {
    const { description, amount, category, date } = this.state.newExpense;
    const randomNumber = Math.floor(Math.random() * 10000) + 1;

    if (description.trim() !== "" && amount !== "" && category.trim() !== "") {
      this.setState((prevState) => ({
        expenses: [
          ...prevState.expenses,
          {
            id: prevState.expenses.length + 1,
            description,
            amount: parseFloat(amount), // Преобразование в число
            category,
            date
          }
        ],
        newExpense: {
          id: 0,
          description: "",
          amount: "",
          category: "",
          date: ""
        }
      }));
    }
  }

  handleDeleteExpense = (id) => {
    const updatedExpenses = this.state.expenses.filter(expense => expense.id !== id);
    this.setState({ expenses: updatedExpenses });
  }

  render() {
    return (
      <div className='container'>
        <h1>Your Expenses</h1>
        <div>
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={this.state.newExpense.description}
            onChange={this.handleInputChange}
          />
          <input
            type="number"
            placeholder="Amount"
            name="amount"
            value={this.state.newExpense.amount}
            onChange={this.handleInputChange}
          />
          <input
            type="date"
            placeholder="Date"
            name="date"
            value={this.state.newExpense.date}
            onChange={this.handleInputChange}
          />
          <select
            name="category"
            value={this.state.newExpense.category}
            onChange={this.handleInputChange}
          >
            <option value="" disabled>Select a category</option>
            {this.state.categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
          <button onClick={this.handleAddExpense}>Add Expense</button>
        </div>
        <table className="expenses-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.expenses.map(expense => (
              <tr key={expense.id}>
                <td>{expense.id}</td>
                <td>{expense.description}</td>
                <td>${expense.amount.toFixed(2)}</td>
                <td>{expense.category}</td>
                <td>{expense.date}</td>
                <td>
                  <button onClick={() => this.handleDeleteExpense(expense.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Expenses;
