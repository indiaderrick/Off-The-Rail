import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {isAuthenticated, deleteToken, decodeToken, tokenUserId } from '../lib/auth';

class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout(){
    deleteToken();
    this.props.history.push('/');
  }

  render(){
    return (
      <nav className="navbar is-primary">
        <div className="navbar-brand">
          {isAuthenticated() && <h2 className="title is-2">Welcome back {decodeToken().username}</h2>}
        </div>
        <div className="navbar-end">
          <Link className="navbar-item" to={'/items'}>Items</Link>
          {isAuthenticated() && <Link className="navbar-item" to={`/users/${tokenUserId()}`}> Profile </Link>}
          {isAuthenticated() && <Link className="navbar-item" to={'/items/new'}>Add an item</Link>}
          {!isAuthenticated() && <Link className="navbar-item" to={'/login'}>Log In</Link>}
          {!isAuthenticated() && <Link className="navbar-item" to={'/register'}>Register</Link>}
          {isAuthenticated() && <a onClick={this.handleLogout} className="navbar-item">Log Out</a>}
        </div>
      </nav>
    );
  }
}

export default withRouter(Header);
