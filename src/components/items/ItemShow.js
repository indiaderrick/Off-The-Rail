import React from 'react';
import axios from 'axios';
import TextColumn from './TextColumn';

class ItemShow extends React.Component{
  constructor(props){
    super(props);
    this.state={};
  }

  componentDidMount(){
    axios.get(`/api/items/${this.props.match.params.id}`)
      .then(result => {
        this.setState({ item: result.data });
        console.log('We have', this.state.item);
      });
  }

  render(){
    const item = this.state.item;
    return(
      <section className="showItemSection">
        {item
          ?
          <div>
            <img src={item.image} />
            <TextColumn item={item}/>
          </div>
          :
          <p> Please wait, page loading... </p>
        }
      </section>
    );
  }
}
export default ItemShow;
