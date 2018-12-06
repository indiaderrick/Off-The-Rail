import React from 'react';
import axios from 'axios';
import { decodeToken, tokenUserId } from '../../lib/auth';

class OwnProfile extends React.Component{
  constructor(props){
    super(props);
    this.state={};
    console.log(decodeToken());
    console.log(tokenUserId());
  }

  componentDidMount(){
    axios.get(`/api/users/${decodeToken().sub}`)
      .then(result => {
        this.setState({ user: result.data });
        console.log('this is this.state.user', this.state.user);
      });
  }

  render(){
    // user = this.state.user;
    return(
      <div>
        <h1> {this.state.user && this.state.user.name} </h1>
        <p> {this.state.user && this.state.user.bio} </p>
      </div>
    );
  }
}

export default OwnProfile;
