import React from 'react';
import axios from 'axios';
import { decodeToken, tokenUserId } from '../../lib/auth';
import { authorizationHeader } from '../../lib/auth';
import { Link } from 'react-router-dom';

class OwnProfile extends React.Component{
  constructor(props){
    super(props);
    this.state={};
    this.followUser = this.followUser.bind(this);
    console.log('this is decodeToken', decodeToken());
    console.log('this is token user Id', tokenUserId());
    console.log('this is this.props.match.params._id', this.props.match.params.id);
  }

  componentDidMount(){
    if(tokenUserId() === this.props.match.params.id){
      axios.get(`/api/users/${decodeToken().sub}`)
        .then(result => {
          this.setState({ user: result.data });
        });
    } else {
      axios.get(`/api/users/${this.props.match.params.id}`)
        .then(result => {
          this.setState({ user: result.data });
        });
    }
  }

  componentDidUpdate(){
    if(tokenUserId() === this.props.match.params.id){
      axios.get(`/api/users/${decodeToken().sub}`)
        .then(result => {
          this.setState({ user: result.data });
        });
    }
  }

  followUser(){
    const currentUserId = decodeToken().sub;
    this.state.user.followers.push(currentUserId);
    axios.post(`/api/users/${this.state.user._id}/follow`, this.state, authorizationHeader());
    console.log('follwoers', this.state.user);
  }

  render(){
    console.log('this is user whose page it is', this.state.user);
    const user = this.state.user;
    return(
      <div className="profile">
        <h1 className="profileName"> {user && user.name} </h1>
        <button className="button buttonColor" onClick={this.followUser}> Follow </button>
        <hr />
        <Link to={'/purchases'}><button>View Purchase History </button></Link>
        <p> {user && user.bio} </p>
        <hr />
        <h2> Added Items: </h2>
        <ul>
          { user && user.addedItems.map((item, i) =>
            <div key={i}>
              <li> Bought for £{item.retailPrice}, Now £{item.newPrice}. You save £{item.retailPrice - item.newPrice }! </li>
              <li> {item.name} </li>
            </div>
          )}
        </ul>
        <hr />
        <ul>
        <h1> followers: </h1>
          { user && user.followers.map((follower, i) =>
            <div key={i}>
              <li> @{follower.username} </li>
            </div>
          )}
        </ul>
      </div>
    );
  }
}
export default OwnProfile;
