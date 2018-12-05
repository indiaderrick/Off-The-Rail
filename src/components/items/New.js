import React from 'react';
import axios from 'axios';

import ItemForm from './ItemForm';

class ItemNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({target: {name, value}}){
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('Submit handled', this.state);
    axios.post('/api/items', this.state)
      .then(() => this.props.history.push('/items'));
  }

  render() {
    return(
      <section className="forms columns is-multiline is-12-desktop">
        <div className="column is-12-desktop">
          <h2 className="title">Add a Item</h2>
        </div>
        <div className="column is-8-desktop">
          <ItemForm handleChange = {this.handleChange} handleSubmit = {this.handleSubmit}/>
        </div>
      </section>
    );
  }
}

export default ItemNew;
