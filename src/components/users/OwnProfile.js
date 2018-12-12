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
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(result => {
        this.setState({ user: result.data }, () => console.log('this is Otheruser', this.state.user));
      });
  }

  componentDidUpdate(){
    if(tokenUserId() === this.props.match.params.id){
      axios.get(`/api/users/${decodeToken().sub}`)
        .then(result => {
          this.setState({ user: result.data }, () => console.log('this is user', this.state.user));
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
      <div className="bioSection profile columns is-multiline is-12">
        <div className=" pSection" >
          <div >
            <img className="profileImage" src={user && user.profilePicture} />
            <h1 className="profileName"> {user && user.name} </h1>
            <p > Based in: {user && user.city} </p>
          </div>

          {
            ( user && tokenUserId() !== this.props.match.params.id)
            &&
            <div >
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
          <div className="bio">
            <p><strong className="strong"> Bio: </strong>{user && user.bio} </p>
          </div>
        </div>
        <hr />
        <div className="column is-12 is-multiline orange">
          <div className="column is-6 green">
            <div>
              { user && <strong className="strong"> Followers ({user.followers.length}) </strong>}
            </div>
            <div>
              { user && <strong className="strong"> Following ({user.peopleYouFollow.length}) </strong>}
            </div>
          </div>
          { (user && user.addedItems )
          &&
          <strong className="strong blue"> Added Items ({user.addedItems.length}): </strong>
          }
          <div className="container">
            <div className="addedItemCards">
              { (user && user.addedItems)
                ?
                user.addedItems.map((item, i) =>
                  <div key={i} className="column is-3" >
                    <Link to={`/items/${item._id}`}><img src={item.image} /></Link>
                    <strong className="strong"> {item.name} </strong>
                    <p> Bought for £{item.retailPrice},<strong> Now £{item.newPrice}</strong>. You save £{item.retailPrice - item.newPrice }! </p>
                  </div>
                )
                :
                <p>  </p> }
            </div>
          </div>
        </div>
        {!this.state.userPosition && !user
          ?
          <p>Loading map...</p>
          :
          <UserMap
            userPosition={this.state.userPosition}
            user={ user } />
        }
        <div className="container">
          {
            (user && tokenUserId() === this.props.match.params.id)
              ?
              <div>
                <hr />
                <strong className="blue likesSection"> ♡ YOUR SAVED FOR LATER ITEMS ♡ </strong>
              </div>
              :
              <div>
                <hr />
                {user && <strong className="blue likesSection"> ♡ LIKED BY {user. name.toUpperCase()} ♡ </strong>}
              </div>
          }
          <div className="addedItemCards likedPhotos">
            { (user && user.thingsILike)
              ?
              user.thingsILike.map((item, i) =>
                <div key={i} className="column is-3" >
                  <Link to={`/items/${item._id}`}><img src={item.image} /></Link>
                  <strong className="strong"> {item.name} </strong>
                </div>
              )
              :
              <p>  </p> }
          </div>
        </div>
      </div>
    );
  }
}
export default OwnProfile;


// getUser(){
//   // if(tokenUserId() === this.props.match.params.id){
//   //   axios.get(`/api/users/${decodeToken().sub}`)
//   //     .then(result => {
//   //       this.setState({ user: result.data }, () => console.log('this is USER', this.state.user));
//   //     });
//   // } else {
//   axios.get(`/api/users/${this.props.match.params.id}`)
//     .then(result => {
//       this.setState({ user: result.data });
//     });
//   // }
// }
