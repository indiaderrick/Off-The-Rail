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
      <section>
        {item
          ?
          <div className="columns is-multiline is-12-desktop">
            <div className="column is-4-desktop">
              <img src={item.image} />
            </div>
            <div className="column is-6-desktop">
              <TextColumn item={item}/>
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
