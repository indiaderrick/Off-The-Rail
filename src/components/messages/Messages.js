import React from 'react';
import axios from 'axios';
import { authorizationHeader } from '../../lib/auth';
import { handleChange } from '../../lib/common';
import Sidebar from './Sidebar';
import Conversation from './Conversation';
import ComposeMessage from './ComposeMessage';


class Messages extends React.Component{
  constructor(props){
    super(props);
    this.state= {};
    this.pickConversation = this.pickConversation.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
    this.handleChange = handleChange.bind(this);
    this.createMessage = this.createMessage.bind(this);
  }

  componentDidMount(){
    axios.get('/api/messages', authorizationHeader())
      .then(result => this.setState({ messages: result.data}, () => console.log('this is result.data', result.data)));
  }

  pickConversation(withWhichUserId) {
    this.setState({ withWhichUserId: withWhichUserId, newMessage: null }, () => console.log('this is other userId', this.state.withWhichUserId));
  }

  deleteMessage(messageId){
    console.log('deleting message', messageId);
    axios.delete(`/api/messages/${messageId}`, authorizationHeader())
      .then(() => this.setState({
        messages: this.state.messages.filter(m => m._id !== messageId)
      }));
  }

  createMessage(){
    axios.post('/api/messages', {
      content: this.state.newMessage,
      to: this.state.withWhichUserId
    }, authorizationHeader())
      .then(result => this.setState({
        messages: this.state.messages.concat(result.data)
      }));
  }

  render(){
    const messages = this.state.messages;
    return(
      <main>
        <h1 className="title is-2">Messages</h1>

        <div className="message-container">

          <div className="sidebar">
            <Sidebar messages={messages} handleClick={this.pickConversation}/>
          </div>

          <div className="messages-main">
            <div className="conversation">
              <Conversation handleDelete={this.deleteMessage} {...this.state}/>
            </div>
            <div className="compose">
              <ComposeMessage handleChange={this.handleChange}
                handleSubmit={this.createMessage}
                {...this.state}/>
            </div>
          </div>

        </div>
      </main>
    );
  }
}

export default Messages;
