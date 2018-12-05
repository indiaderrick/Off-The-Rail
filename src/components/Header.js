import React from 'react';
import { Link, withRouter } from 'react-router-dom';


class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return (
      <nav className="navbar is-primary">
        <div className="navbar-brand">
          <h2 className="title is-2">Shopping</h2>
        </div>
        <div className="navbar-end">
          <Link className="navbar-item" to={'/items'}>Items</Link>
          <Link className="navbar-item" to={'/items/new'}>Add an item</Link>
          <Link className="navbar-item" to={'/login'}>Log In</Link>
        </div>
      </nav>
    );
  }
}

export default withRouter(Header);
