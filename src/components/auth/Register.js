import React from 'react';
import axios from 'axios';
import { saveToken } from '../../lib/auth';
import { handleChange } from '../../lib/common';

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state={};
  }

  handleSubmit = (event) => {
    event.preventDefault();
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
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <input
            className="input"
            name="name"
            placeholder="Name"
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <input
            className="input"
            name="profilePicture"
            placeholder="Profile Picture"
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <input
            className="input"
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <input
            className="input"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <input
            className="input"
            name="bio"
            placeholder="Bio"
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <input
            className="input"
            name="location.lat"
            placeholder="Your Latitude"
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <input
            className="input"
            name="location.lng"
            placeholder="Your Longitude"
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <input
            type="password"
            className="input"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <input
            type="text"
            className="input"
            name="city"
            placeholder="City"
            onChange={handleChange}
          />
        </div>
        <button className="button is-primary">Submit</button>
      </form>
    );
  }
}

export default Register;
