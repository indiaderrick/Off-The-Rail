import React from 'react';
import axios from 'axios';
import { saveToken } from '../../lib/auth';
import { handleChange } from '../../lib/common';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post('/api/login', this.state)
      .then(res => {
        //research what this does a bit more!
        saveToken(res.data.token);
      })
      .then(() => this.props.history.push('/items'))
      .catch(() => {
        this.props.history.replace('/login');
      });
  }
  //change redirect to home

  render() {
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <input className="input" name="email" placeholder="Email" onChange={this.handleChange} />
          </div>
          <div className="field">
            <input type="password" className="input" name="password" placeholder="Password" onChange={this.handleChange} />
          </div>
          <button className="button is-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;
