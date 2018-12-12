import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { handleChange } from '../../lib/common';
import { decodeToken } from '../../lib/auth';
import { authorizationHeader } from '../../lib/auth';
import FollowingBox from './FollowingBox';

class ItemIndex extends React.Component{
  constructor(props){
    super(props);
    this.state={
      query: ''
    };
    this.getFollowing = this.getFollowing.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    console.log('component created');
  }

  componentDidMount(){
    console.log('component mounted!');
    axios.get('/api/items', this.getFollowing())
      .then(result => this.setState({ items: result.data, filteredItems: result.data }));
  }

  getFollowing(){
    axios.get(`/api/users/${decodeToken().sub}/getFollowing`, authorizationHeader())
      .then(result => {
        this.setState({ userWithFollowing: result.data }, () => console.log('this is Otheruser', this.state.userWithFollowing));
      });
  }

  handleInputChange() {
    this.setState({
      query: this.search.value});
    let filteredItems = this.state.filteredItems;
    const items = this.state.items;
    console.log('items', items);
    const query = this.state.query;
    filteredItems = items.filter(item =>
      item.name.toLowerCase().startsWith(query.toLowerCase()) ||
        item.originallyFrom.toLowerCase().startsWith(query.toLowerCase())
    );
    console.log('state ====>', this.state);
    this.setState({ filteredItems: filteredItems });
  }

  render(){
    const userWithFollowing = this.state.userWithFollowing;
    return(
      <div className="container indexContainer has-items-centered">
        <section className="columns is-multiline">
          <div className=" has-text-centered">
            <hr/>
            <div>
              {this.state.query === ''
                ?
                <div>
                  <h1 className="search-title is-size-2">SHOP DESIGNER ITEMS</h1>
                  <h1 className="search-title is-size-7">T I M E L E S S ✧  A N D ✧  A F F O R D A B L E </h1>
                </div>
                :
                <h1 className="search-title is-size-4">Search Results</h1>}
            </div>
            <div className="column is-12-desktop">
              <form>
                <input
                  placeholder="Search by name, designer ..."
                  ref={input => this.search = input}
                  onChange={this.handleInputChange}
                  className="input subtitle is-size-6 has-text-centered"
                />
              </form>
            </div>
            { (userWithFollowing && userWithFollowing.peopleYouFollow.length !== 0)
              &&
              <div className="column is-12 is-size-4 indexFollowingTitle">
                <p> Keep up to date with your favourite sellers: </p>
              </div>
            }
            <div className="column followingIndex is-12">
              {userWithFollowing &&
            userWithFollowing.peopleYouFollow.map( user =>
              <Link to={`/users/${user._id}`} className="column is-2-desktop" key={user.name}><div>
                <FollowingBox name={user.name} image={user.profilePicture} location={user.city}/>
              </div></Link>
            )}
            </div>
            <div className="container column itemContainer">
              <div className="eachItem">
                {this.state.filteredItems &&
                this.state.filteredItems.map( filteredItem =>
                  <div className="column is-4-desktop" key={filteredItem.name}>
                    <Link to={`/items/${filteredItem._id}`} ><img src={filteredItem.image} /> </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default ItemIndex;
