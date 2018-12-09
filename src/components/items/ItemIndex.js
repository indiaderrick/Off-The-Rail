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
      <section className="index container columns is-multiline">
        <div className="hero column is-12-desktop">
          <h1> Search designer clothes at reasonable prices </h1>
        </div>
        <div className="eachItem">
          {this.state.items && this.state.items.map(item =>
            <div className="column is-4-desktop" key={item._id}>
            <Link to={`/items/${item._id}`} ><img src={item.image} /> </Link>
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default WonderIndex;
