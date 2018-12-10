import React from 'react';
import axios from 'axios';
import { authorizationHeader } from '../../lib/auth';
import { handleChange } from '../../lib/common';
import ItemForm from './ItemForm';

class ItemEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log('this is sdmflkmslf', this.props.match.params.id);
  }

  componentDidMount(){
    axios.get(`/api/items/${this.props.match.params.id}`)
      .then(result => {
        this.setState({
          item: result.data,
          blah: 'haha'
        });
        console.log('this is this.state', this.state);
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('Submit handled', this.state);
    axios.put(`/api/items/${this.props.match.params.id}`, this.state, authorizationHeader())
      .then(() => this.props.history.push(`/items/${this.props.match.params.id}`));
  }

  render() {
    return(
      <section className="forms columns is-multiline is-12-desktop">
        <div className="column is-12-desktop">
          <h2 className="title">Edit Item</h2>
        </div>
        <div className="column is-8-desktop">
          <ItemForm handleChange = {this.handleChange} handleSubmit = {this.handleSubmit}/>
        </div>
      </section>
    );
  }
}

export default ItemEdit;
