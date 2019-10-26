import React from 'react';
import logo from './logo.svg';
import './Login.css';

export class Login extends React.Component {
  
  constructor(props) {
    super(props);
	this.state = {
	  username: null,
	  word: null,
	};
	this.usernameChange = this.usernameChange.bind(this);
	this.passwordChange = this.passwordChange.bind(this);
  }
  
  usernameChange(event) {
	console.log(this);
    this.setState({username: event.target.value});
  }
  
  passwordChange(event) {
    this.setState({word: event.target.value});
  }
  
  login() {
	//make database call, see if username and password are there, and log in based on that
	/*if (valid) {
	  change to calendar page
	} else {
	  display error message
	}*/
	console.log("Reached login");
  }
    
  render() {
	return (
	  <div className="login">
		<input id="username" value={this.state.username} onChange={this.usernameChange} />
		<input id="password" value={this.state.word} onChange={this.passwordChange} />
		<button id="submit" onClick={this.login}>Submit</button>
	  </div>
	);
  }
}

export default Login;