import React from 'react';
import axios from 'axios';
import TextColumn from './TextColumn';
import { authorizationHeader, isAuthenticated, tokenUserId } from '../../lib/auth';
import { addItem } from '../../lib/basket';
import { handleChange } from '../../lib/common';
// import { messageUserOfItem } from '../../lib/messages';
import basketLib from '../../lib/basket';
import { Link } from 'react-router-dom';

class ItemShow extends React.Component{
  constructor(props){
    super(props);
    this.state={};
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = handleChange.bind(this);
    // this.messageUserOfItem = this.messageUserOfItem.bind(this);
  }

  componentDidMount(){
    axios.get(`/api/items/${this.props.match.params.id}`)
      .then(result => {
        this.setState({ item: result.data });
        console.log('this is this.state', this.state);
      });
  }

  handleDelete(){
    axios.delete(`/api/items/${this.state.item._id}`, authorizationHeader())
      .then(() => {
        this.props.history.push('/items');
      });
  }

  handleClick() {
    console.log('this is this.state', this.state);
    addItem(this.state.item, parseInt(this.state.quantity));
    this.props.history.push('/basket');
  }

  render(){
    const item = this.state.item;

    return(
      <section className="container show">
        <div className="column is-12">
          <p className="itemName"> {item && item.name.toUpperCase()} </p>
        </div>
        {item
          ?
          <div className="columns is-multiline is-12-desktop">
            <div className="column is-4-desktop">
              <img src={item.image} />
            </div>
            <div className="column is-6-desktop">
              <TextColumn item={item} handleDelete={this.handleDelete}/>
            </div>

            <div className="column is-4">
              { (isAuthenticated() && tokenUserId() !== item.addedBy._id)
                &&
                <button className="button" onClick={this.handleClick}>Add to basket</button>}
            </div>

            <div className="column is-4">
              { (isAuthenticated() && tokenUserId() !== item.addedBy._id)
                &&
                <Link to={`/messages/${item.addedBy._id}/new`}><button className="button" >Message User</button></Link> }
            </div>
          </div>
          :
          <p> Please wait, page loading... </p>
        }
        <div className="column is-4">
          { (item && isAuthenticated() && tokenUserId() === item.addedBy._id)
            &&
            <strong>This is your item!</strong>}
        </div>
      </section>
    );
  }
}
export default ItemShow;

// {
//   basket.forEach(result => {
//     console.log('is this true', result.name !== item.name);
//     if(result.name !== item.name){
//       console.log('not in basket');
//       <button className="button" onClick={this.handleClick}>Add to basket</button>
//     }
//   })
// }

// <div className="column is-4">
//   { isAuthenticated() && <Link to={`/messages/${item.addedBy._id}`}><button className="button" >Message User</button></Link> }
// </div>
