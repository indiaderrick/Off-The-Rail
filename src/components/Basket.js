import React from 'react';
import basketLib from '../lib/basket';

class Basket extends React.Component{
  constructor(props){
    super(props);
    this.state={};
    this.handleDelete = this.handleDelete.bind(this);
    this.checkout = basketLib.checkout.bind(this);
  }

  componentDidMount(){
    this.setState({ basket: basketLib.getBasket() });
  }

  handleDelete(itemId){
    basketLib.removeItem(itemId);
    this.setState({ basket: basketLib.getBasket()});
  }


  render(){
    console.log('this is the basket', this.state.basket);
    const basket = this.state.basket;
    const hasItems = basket && !!basket.length;

    return(
      <main className="container">
        <h1>Your Basket :</h1>
        {basket && hasItems ? basket.map(item =>
          <div key={item._id} className="columns">
            <div className="column is-3">
              <p>{item.name}</p>
            </div>
            <div className="column is-3">
              <p>£{item.newPrice}</p>
            </div>
            <div className="column is-1">
              <a className="delete" onClick={() => this.handleDelete(item._id)}></a>
            </div>
          </div>
        ) : <p>No items</p>}
        {basket && hasItems &&
          <section className="columns">
            <div className="column">
              <button className="button is-warning" onClick={() => this.setState({ basket: basketLib.createBasket() })}>Clear basket</button>
            </div>
            <div className="column">
              <p className="column">Total price: £{basketLib.totalBasketPrice()}</p>
            </div>
            <div className="column">
              <button className="button is-link" onClick={this.checkout}>Check out</button>
            </div>
          </section>
        }
      </main>
    );
  }
}


export default Basket;
