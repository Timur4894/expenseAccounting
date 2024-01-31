import React, { Component } from 'react';
import './App.css';
import LogScreen from '../logScreen/logScreen';
import ScreenHolder from '../screenHolder/screenHolder';
import Expenses from '../expenses/expenses';
import Categories from '../categories/categories';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
    };
  }

  handleLogin = () => {
    
    this.setState({ isAuthenticated: true });
  };

  render() {
    console.log("Authentication State:", this.state.isAuthenticated);
    
    return (
      <div className="App">
        <main>
          {this.state.isAuthenticated ? (
            <ScreenHolder/>
          ) : (
            <LogScreen onLogin={this.handleLogin} />
          )}
        </main>
      </div>
    );
  }
}

export default App;
