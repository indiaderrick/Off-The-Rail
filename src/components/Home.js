import React from 'react';
import { Link } from 'react-router-dom';
class Home extends React.Component{
  constructor(props){
    super(props);
    this.state= {};
  }

  render(){
    return(
      <div className="welcome-section">
        <div>
          <p className="intro">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus maxime, reprehenderit nesciunt deleniti eveniet a magni. </p>
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
