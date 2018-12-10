import React from 'react';
import axios from 'axios';
import { decodeToken, tokenUserId, isAuthenticated } from '../../lib/auth';
import { authorizationHeader } from '../../lib/auth';
import { Link } from 'react-router-dom';

class OwnProfile extends React.Component{
  constructor(props){
    super(props);
    this.state={};
    this.followUser = this.followUser.bind(this);
    this.unfollowUser = this.unfollowUser.bind(this);
    console.log('this is decodeToken', decodeToken());
  }

  componentDidMount(){
    if(tokenUserId() === this.props.match.params.id){
      axios.get(`/api/users/${decodeToken().sub}`)
        .then(result => {
          this.setState({ user: result.data }, () => console.log('this is USER', this.state.user));
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
    const followers = this.state.user.followers;
    if(!followers.includes(currentUserId)){
      followers.push(currentUserId);
      this.setState({ followers: followers });
      axios.post(`/api/users/${this.state.user._id}/follow`, this.state.followers, authorizationHeader());
      console.log('follwoers', this.state.user);
    }
  }

  unfollowUser(){
    const currentUserId = decodeToken().sub;
    const followers = this.state.user.followers;
    if(followers.includes(currentUserId)){
      followers.splice(followers.indexOf(currentUserId), 1);
      this.setState({ followers: followers});
      axios.delete(`/api/users/${this.state.user._id}/follow`, authorizationHeader());
    }
  }

  render(){
    const user = this.state.user;

    return(
      <div className="profile">
        <h1 className="profileName"> {user && user.name} </h1>
        {
          (user && user.followers.includes(decodeToken().sub))
            ?
            <button className="button" onClick={this.unfollowUser}> Unfollow </button>
            :

            <button className="button" onClick={this.followUser}> Follow </button>
        }
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
