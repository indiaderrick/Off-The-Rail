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
      <section className="register">
        <form className="forms form-section" onSubmit={this.handleSubmit}>
          <section className="hero">
            <div className="hero-body">
              <div className="container has-text-centered">
                <div className="column is-4 is-offset-4">
                  <h2 className="title has-text-grey" id="auth-titles">Register</h2>
                  <div className="box">
                    <figure className="avatar">
                    </figure>
                    <form>
                      <div className="field">
                        <div className="control has-icons-left">
                          <input
                            className="input"
                            name="name"
                            placeholder="Name"
                            onChange={this.handleChange}
                          />
                          <span className="icon is-small is-left">
                            <i className="fas fa-signature"></i>
                          </span>
                        </div>
                      </div>
                      <div className="field">
                        <div className="control has-icons-left">
                          <input
                            className="input"
                            name="profilePicture"
                            placeholder="Profile Picture"
                            onChange={this.handleChange}
                          />
                          <span className="icon is-small is-left">
                            <i className="far fa-user"></i>
                          </span>
                        </div>
                      </div>
                      <div className="field">
                        <div className="control has-icons-left">
                          <input
                            className="input"
                            name="username"
                            placeholder="Username"
                            onChange={this.handleChange}
                          />
                          <span className="icon is-small is-left">
                            <i className="fas fa-signature"></i>
                          </span>
                        </div>
                      </div>
                      <div className="field">
                        <div className="control has-icons-left">
                          <input
                            className="input"
                            name="email"
                            placeholder="Email"
                            onChange={this.handleChange}
                          />
                          <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                          </span>
                        </div>
                      </div>
                      <div className="field">
                        <div className="control has-icons-left">
                          <input
                            className="input"
                            name="bio"
                            placeholder="Bio"
                            onChange={this.handleChange}
                          />
                          <span className="icon is-small is-left">
                            <i className="far fa-comment-dots"></i>
                          </span>
                        </div>
                      </div>
                      <div className="field">
                        <div className="control has-icons-left">
                          <input
                            className="input"
                            name="location.lat"
                            placeholder="Your Latitude"
                            onChange={this.handleChange}
                          />
                          <span className="icon is-small is-left">
                            <i className="fas fa-compass"></i>
                          </span>
                        </div>
                      </div>
                      <div className="field">
                        <div className="control has-icons-left">
                          <input
                            className="input"
                            name="location.lng"
                            placeholder="Your Longitude"
                            onChange={this.handleChange}
                          />
                          <span className="icon is-small is-left">
                            <i className="far fa-compass"></i>
                          </span>
                        </div>
                      </div>
                      <div className="field">
                        <div className="control has-icons-left">
                          <input
                            type="password"
                            className="input"
                            name="password"
                            placeholder="Password"
                            onChange={this.handleChange}
                          />
                          <span className="icon is-small is-left">
                            <i className="fas fa-lock"></i>
                          </span>
                        </div>
                      </div>
                      <div className="field">
                        <div className="control has-icons-left">
                          <input
                            type="text"
                            className="input"
                            name="city"
                            placeholder="City"
                            onChange={this.handleChange}
                          />
                          <span className="icon is-small is-left">
                            <i className="fas fa-map-marker-alt"></i>
                          </span>
                        </div>
                      </div>
                      <button className="button is-block is-info is-large is-fullwidth">Register</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </form>
      </section>
    );
  }
}

export default Register;
