import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { handleChange } from '../../lib/common';

class ItemIndex extends React.Component{
  constructor(props){
    super(props);
    this.state={
      query: ''
    };
    this.handleInputChange = handleChange.bind(this);
    console.log('component created');
  }

  componentDidMount(){
    console.log('component mounted!');
    axios.get('/api/items')
      .then(result => this.setState({ items: result.data, filteredItems: result.data }));
  }

  handleInputChange() {
    this.setState({
      query: this.search.value});
    let filteredItems = this.state.filteredItems;
    const items = this.state.items;
    console.log('items', items);
    const query = this.state.query;
    filteredItems = items.filter(item =>
      item.name.toLowerCase().startsWith(query.toLowerCase()) ||
        item.originallyFrom.toLowerCase().startsWith(query.toLowerCase())
    );
    console.log('state ====>', this.state);
    this.setState({ filteredItems: filteredItems });
  }


  render(){
    return(
      <section className="index container columns is-multiline">
        <div className="column is-12-desktop">
          <form>
            <input
              placeholder="Search by name, designer ..."
              ref={input => this.search = input}
              onChange={this.handleInputChange}
              className="input subtitle is-size-6"
            />
          </form>
        </div>

        <div className="centered-container">
          <hr/>
          <div>
            {this.state.query === ''
              ?
              <h1 className="search-title is-size-4">SHOP DESIGNER ITEMS</h1>
              :
              <h1 className="search-title is-size-4">Search Results</h1>}
          </div>
          <div className="eachItem">
            {this.state.filteredItems &&
              this.state.filteredItems.map( filteredItem =>
                <div className="column is-4-desktop" key={filteredItem._id}>
                  <Link to={`/items/${filteredItem._id}`} ><img src={filteredItem.image} /> </Link>
                </div>
              )}
          </div>

        </div>

      </section>
    );
  }
}

export default ItemIndex;

// <div className="eachItem">
//   {this.state.items && this.state.items.map(item =>
//     <div className="column is-4-desktop" key={item._id}>
//       <Link to={`/items/${item._id}`} ><img src={item.image} /> </Link>
//     </div>
//   )}
// </div>
