import React from 'react';
import axios from 'axios';
import TextColumn from './TextColumn';
import { authorizationHeader } from '../../lib/auth';

class ItemShow extends React.Component{
  constructor(props){
    super(props);
    this.state={};
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount(){
    axios.get(`/api/items/${this.props.match.params.id}`)
      .then(result => {
        this.setState({ item: result.data });
        console.log('this is this.state,item', this.state.item);
      });
  }

  handleDelete(){
    axios.delete(`/api/items/${this.state.item._id}`, authorizationHeader())
      .then(() => {
        this.props.history.push('/items');
      });
  }

  render(){
    const item = this.state.item;
    return(
      <section>
        {item
          ?
          <div className="columns is-multiline is-12-desktop">
            <div className="column is-4-desktop">
              <img src={item.image} />
            </div>
            <div className="column is-6-desktop">
              <TextColumn item={item} handleDelete={this.handleDelete}/>
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
