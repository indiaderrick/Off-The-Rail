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
      .then(result => this.setState({ purchases: result.data }));
  }

  render() {
    console.log(this.state.purchases);
    const purchases = this.state.purchases;
    return(
      <main className="purchases">
        {
          purchases && purchases.map(purchase =>
            <div key={purchase._id} style={{ display: 'flex', justifyContent: 'space-around' }}>
              <p>{purchase.item.name}</p>
              <p>£{purchase.item.newPrice}</p>
              <p>{moment(purchase.createdAt).fromNow()}</p>
            </div>
          )
        }
      </main>
    );
  }
}

export default PurchaseHistory;

//do a total spent and total saved function!
