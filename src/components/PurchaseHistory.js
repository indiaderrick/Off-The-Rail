import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { authorizationHeader } from '../lib/auth';
// import { getToken } from '../lib/auth';

class PurchaseHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios.get('/api/purchases', authorizationHeader())
      .then(result => this.setState({ purchases: result.data }, () => console.log('this is purchases', this.state.purchases)));
  }

  render() {
    console.log(this.state.purchases);
    const purchases = this.state.purchases;
    return(
      <main className="purchases">
        <div className="columns is-12 hero">
          <h1 className="purchaseTitle"> VIEW YOUR PURCHASE HISTORY </h1>
          <hr />
        </div>
        <ul>
          {
            purchases
              ?
              purchases.map(purchase =>
                <div key={purchase._id} style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <img className="image is-48x48" src={purchase.item.image} /><strong className="column purchaseHistoryOrange" >{purchase.item.name}</strong>
                  <p className="column" >£{purchase.item.newPrice}, but at least <strong> you saved £{purchase.item.retailPrice - purchase.item.newPrice}</strong></p>
                  <p className="column" >{moment(purchase.createdAt).fromNow()}</p>
                </div>
              )
              :
              <p> You havent bought anything yet! </p>
          }

        </ul>
      </main>
    );
  }
}

export default PurchaseHistory;

//do a total spent and total saved function!
