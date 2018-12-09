import React from 'react';
import axios from 'axios';
import { decodeToken, tokenUserId } from '../../lib/auth';

class OwnProfile extends React.Component{
  constructor(props){
    super(props);
    this.state={};
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

  render(){
    const user = this.state.user;
    return(
      <div className="profile">
        <h1> {user && user.name} </h1>
        <button className="button buttonColor"> Follow </button>
        <hr />
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
      </div>
    );
  }
}
export default OwnProfile;
