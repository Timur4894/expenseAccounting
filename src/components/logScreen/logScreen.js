import React, { Component } from "react";
import './logScreen.css';

class LogScreen extends Component {
  constructor(props) {
    super(props);
  }

  handleLoginClick = () => {
    // Ваша логика проверки учетных данных
    // При успешной авторизации вызывайте переданную функцию onLogin
    this.props.onLogin();
  };

  render() {
    return (
      <div className='container'>
        <div className="main">
          <p className="sign" align="center">Sign in</p>
          <form className="form1">
            <input className="un" type="text" align="center" placeholder="Username" />
            <input className="pass" type="password" align="center" placeholder="Password" />
            <button className="submit" type="button" align="center" onClick={this.handleLoginClick}>Login</button>
            <p className="forgot" align="center"><a href="#">SignIn</a></p>
          </form>
        </div>
      </div>
    );
  }
}

export default LogScreen;
