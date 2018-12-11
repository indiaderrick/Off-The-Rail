import React from 'react';
import { Link } from 'react-router-dom';
class Home extends React.Component{
  constructor(props){
    super(props);
    this.state= {};
  }

  render(){
    return(
      <div className="welcome-section columns is-multiline">
        <div>
          <p className="intro">OFF THE RAIL. Buy and sell designer items at prices your pocket can provide ✦ </p>
        </div>
        <Link to={'/items'}><div className="title">
          <p>Start</p>
          <p className="app-name">shopping</p>
        </div></Link>
      </div>
    );
  }
}

export default Home;
