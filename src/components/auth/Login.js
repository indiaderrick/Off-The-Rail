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
      <div className="forms login">
        <form className="form-section" onSubmit={this.handleSubmit}>
          <section className="hero">
            <div className="hero-body">
              <div className="container has-text-centered">
                <div className="column is-4 is-offset-4">
                  <h2 className="title has-text-grey" >Login</h2>
                  <div className="box">
                    <figure className="avatar">
                    </figure>

                    <div className="field">
                      <div className="control has-icons-left">
                        <input className="input" name="email" placeholder="Email" onChange={this.handleChange} />
                        <span className="icon is-small is-left">
                          <i className="fas fa-envelope"></i>
                        </span>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control has-icons-left">
                        <input type="password" className="input" name="password" placeholder="Password" onChange={this.handleChange} />
                        <span className="icon is-small is-left">
                          <i className="fas fa-lock"></i>
                        </span>
                      </div>
                    </div>
                    <button className="button is-block is-info is-large is-fullwidth">Login</button>

                  </div>
                </div>
              </div>
            </div>
          </section>
        </form>
      </div>
    );
  }
}

export default Login;



// <form className="form-section" onSubmit={this.handleSubmit}>
//   <div className="field">
//     <input className="input" name="email" placeholder="Email" onChange={this.handleChange} />
//   </div>
//   <div className="field">
//     <input type="password" className="input" name="password" placeholder="Password" onChange={this.handleChange} />
//   </div>
//   <button className="button is-primary">Submit</button>
// </form>
