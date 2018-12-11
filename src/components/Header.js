import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {isAuthenticated, deleteToken, tokenUserId } from '../lib/auth';

class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout(){
    deleteToken();
    this.props.history.push('/');
    localStorage.removeItem('basket');
    console.log('logging out');
  }
  //use function from basket lib to remove basket!!

  render(){
    return (
      <nav className="navbar has-background-white is-fixed-top">
        <Link to={'/'}><div className="navbar-brand">
          <img className="logo" src="https://i.pinimg.com/originals/ea/aa/5f/eaaa5f39862b3a573f83b863c11a6f95.jpg" /><p className="navbar-item">OFF THE RAIL</p>
        </div></Link>

        <div className="navbar-end">
          <Link className="navbar-item" to={'/items'}>Explore</Link>
          {isAuthenticated() && <Link className="navbar-item" to={`/users/${tokenUserId()}`}> Profile </Link>}
          {isAuthenticated() && <Link className="navbar-item" to={'/basket'}> Basket </Link>}
          {isAuthenticated() && <Link className="navbar-item" to={'/messages'}> Messages </Link>}
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
