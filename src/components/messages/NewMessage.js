import React from 'react';
import axios from 'axios';
import { authorizationHeader } from '../../lib/auth';
import { decodeToken } from '../../lib/auth';
import { handleChange } from '../../lib/common';

class NewMessage extends React.Component{
  constructor(props){
    super(props);
    this.state= {};
    this.handleChange = handleChange.bind(this);
    this.createNewMessage = this.createNewMessage.bind(this);
    console.log('this is url id', this.props.match.params.id);
  }

  createNewMessage(){
    axios.post('/api/messages', {
      content: this.state.newMessage,
      to: this.props.match.params.id,
      from: decodeToken().sub
    }, authorizationHeader())
      .then(() => this.props.history.push('/messages'));
  }

  render(){
    // const messageUser = this.props.match.parmas.id;
    return(
      <section className="newMessage container">
        <h1> COMPOSE A NEW MESSAGE </h1>
        <div className="media-content">
          <div className="field">
            <p className="control">
              <textarea className="textarea" placeholder="Write a message..." name="newMessage" onChange={this.handleChange}/>
            </p>
          </div>

          <nav className="level">
            <div className="level-left">
              <div className="level-item" onClick={this.createNewMessage}>
                <a className="button" >Submit</a>
              </div>
            </div>
          </nav>

        </div>
      </section>
    );
  }
}

export default NewMessage;
