import React from 'react';
import axios from 'axios';
import { decodeToken, tokenUserId } from '../../lib/auth';
import { authorizationHeader } from '../../lib/auth';
import { Link } from 'react-router-dom';
import UserMap from '../Map';

class OwnProfile extends React.Component{
  constructor(props){
    super(props);
    this.state={};
    this.followUser = this.followUser.bind(this);
    this.unfollowUser = this.unfollowUser.bind(this);
    this.getUser = this.getUser.bind(this);
    this.getLocation = this.getLocation.bind(this);
    console.log('this is decodeToken', decodeToken());
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(this.getLocation, this.getUser);
  }

  getLocation(pos) {
    this.setState({ userPosition: [pos.coords.latitude, pos.coords.longitude]}, () => {
      this.getUser();
    });
  }

  getUser(){
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
        <p > Based in: {user && user.city} </p>
        {
          ( user && tokenUserId() !== this.props.match.params.id)
          &&
          <div>
            <div>
              <Link to={`/messages/${user._id}/new`}><button className="button"> Message User </button></Link>
            </div>
            {
              (user && user.followers.includes(decodeToken().sub))
                ?
                <button className="button" onClick={this.unfollowUser}> Unfollow </button>
                :
                <button className="button" onClick={this.followUser}> Follow </button>
            }
          </div>
        }
        <hr />
        {
          (user && tokenUserId() === this.props.match.params.id)
            &&
            <div>
              <Link to={'/purchases'}><button className="button"> Purchase History </button></Link>
            </div>
        }
        <p> {user && user.bio} </p>
        {!this.state.userPosition && !user
          ?
          <p>Loading map...</p>
          :
          <UserMap
            userPosition={this.state.userPosition}
            user={ user } />
        }
        <hr />
        { (user && user.addedItems )
          &&
          <p> Added Items ({user.addedItems.length}): </p>
        }
        <ul>
          { (user && user.addedItems)
            ?
            user.addedItems.map((item, i) =>
              <div key={i}>
                <li> Bought for £{item.retailPrice}, Now £{item.newPrice}. You save £{item.retailPrice - item.newPrice }! </li>
                <li> {item.name} </li>
              </div>
            )
            :
            <p> No items added yet </p> }
        </ul>
        <hr />
        <ul>
          { user && <li> Followers ({user.followers.length}) : </li>}
          { user && user.followers.map((follower, i) =>
            <div key={i}>
              <li> @{follower.username} <span><img className="icon" src={follower.profilePicture} /></span></li>
            </div>
          )}
        </ul>

      </div>
    );
  }
}
export default OwnProfile;
