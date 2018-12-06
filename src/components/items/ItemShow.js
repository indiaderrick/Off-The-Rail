import React from 'react';
import axios from 'axios';
import TextColumn from './TextColumn';
import { authorizationHeader } from '../../lib/auth';
import { addItem } from '../../lib/basket';
import { handleChange } from '../../lib/common';
import basketLib from '../../lib/basket';

class ItemShow extends React.Component{
  constructor(props){
    super(props);
    this.state={};
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = handleChange.bind(this);
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
    console.log('this is item', this.state.item)
    const basket = this.state.basket;
    return(
      <section className="container">
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
              <button className="button" onClick={this.handleClick}>Add to basket</button>
            </div>
          </div>
          :
          <p> Please wait, page loading... </p>
        }
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
