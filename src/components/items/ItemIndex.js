import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class WonderIndex extends React.Component{
  constructor(props){
    super(props);
    this.state={};
    console.log('component created');
  }

  componentDidMount(){
    console.log('component mounted!');
    axios.get('/api/items')
      .then(result => this.setState({ items: result.data}));
  }

  render(){
    return(
      <section className="columns is-multiline">
        <div className="eachItem">
          {this.state.items && this.state.items.map(item => <Link to={`/items/${item._id}`} key={item._id}><img src={item.image} /> </Link>)}
        </div>
      </section>
    );
  }
}

export default WonderIndex;
