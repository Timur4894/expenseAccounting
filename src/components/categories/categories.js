import React, { Component } from "react";
import './categories.css';

class Categories extends Component {
  constructor(props) {
    super(props);

    // Загружаем данные из локального хранилища
    const savedCategories = JSON.parse(localStorage.getItem("categories")) || [];

    this.state = {
      categories: savedCategories,
      newCategory: "",
    };
  }

  componentDidUpdate() {
    // Сохраняем данные в локальное хранилище при обновлении компонента
    localStorage.setItem("categories", JSON.stringify(this.state.categories));
  }

  handleInputChange = (e) => {
    this.setState({ newCategory: e.target.value });
  }

  handleAddCategory = () => {
    if (this.state.newCategory.trim() !== "") {
      this.setState((prevState) => ({
        categories: [...prevState.categories, prevState.newCategory],
        newCategory: "",
      }));
    }
  }

  handleDeleteCategory = (index) => {
    const updatedCategories = [...this.state.categories];
    updatedCategories.splice(index, 1);
    this.setState({ categories: updatedCategories });
  }

  render() {
    return (
      <div className='container'>
        <h1>Add Categories</h1>
        <div>
          <input
            type="text"
            placeholder="New Category"
            value={this.state.newCategory}
            onChange={this.handleInputChange}
          />
          <button onClick={this.handleAddCategory}>Add Category</button>
        </div>
        <ul className="categories-list">
          {this.state.categories.map((category, index) => (
            <li key={index}>
              {category}
              <button onClick={() => this.handleDeleteCategory(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Categories;
