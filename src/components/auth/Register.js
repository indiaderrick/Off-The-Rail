import React from 'react';
import axios from 'axios';
import { saveToken } from '../../lib/auth';
import { handleChange } from '../../lib/common';

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state={};
    this.handleChange = handleChange.bind(this);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('this is thhis.state', this.state);
    axios.post('/api/register', this.state)
      .then(res => {
        saveToken(res.data.token);
        console.log('new user', res);
      })
      .then(() => this.props.history.push('/items'))
      .catch(() => {
        this.props.history.replace('/login');
      });
  }
  //change redirect to home later
  render(){
    return(
      <form className="register" onSubmit={this.handleSubmit}>
        <div className="field">
          <input
            className="input"
            name="name"
            placeholder="Name"
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <input
            className="input"
            name="profilePicture"
            placeholder="Profile Picture"
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <input
            className="input"
            name="username"
            placeholder="Username"
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <input
            className="input"
            name="email"
            placeholder="Email"
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <input
            className="input"
            name="bio"
            placeholder="Bio"
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <input
            className="input"
            name="location.lat"
            placeholder="Your Latitude"
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <input
            className="input"
            name="location.lng"
            placeholder="Your Longitude"
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <input
            type="password"
            className="input"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <input
            type="text"
            className="input"
            name="city"
            placeholder="City"
            onChange={this.handleChange}
          />
        </div>
        <button className="button is-primary">Submit</button>
      </form>
    );
  }
}

export default Register;
