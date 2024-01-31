import React, { Component } from "react";
import './logScreen.css';
import Spinner from "../spiner/spiner";
class LogScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loading: false
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };



  handleLoginClick = () => {
    const { email, password } = this.state;
    const mainhttp = "https://finance-tracker-v31w.onrender.com";
  
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
  
    fetch(`${mainhttp}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(response => response.json(), this.setState({
        loading: true
    }))
      .then(data => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          this.props.onLogin();
          this.setState({
            loading: false
        })
        } else {
          alert("Login failed. Please check your credentials.");
          this.setState({
            loading: false
        })
        }
      })
      .catch(error => {
        console.error("Error during login:", error);
        alert("An error occurred during login. Please try again.");
        this.setState({
          loading: false
      })
      });
  };
  

  render() {
    const {loading} = this.state
    const spinner = loading ? <Spinner/> : null;
    
    return (
      <div className='container'>
        <div className="main">
          <p className="sign" align="center">{spinner}Sign in</p>
          <form className="form1">
            <input
              className="un"
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
              align="center"
              placeholder="Email"
            />
            <input
              className="pass"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              align="center"
              placeholder="Password"
            />
            <button
              className="submit"
              type="button"
              align="center"
              onClick={this.handleLoginClick}
            >
              Sign-Up
            </button>
            <p className="forgot" align="center">
            <a href="#">LogIn</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default LogScreen;
