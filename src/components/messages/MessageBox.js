import React from 'react';
import moment from 'moment';
import { tokenUserId } from '../../lib/auth';

function MessageBox({ message, handleDelete }) {
  return (
    <div className="media" key={message._id}>
      <img src={message.from.image}/>
      <strong>{message.from.username}</strong>
      <p> {message.content} </p>
      <br />
      <small>{moment(message.createdAt).fromNow()}</small>
      {
        message.from._id === tokenUserId() &&
              <div className="media-right">
                <button className="delete" onClick={() => handleDelete(message._id)}></button>
              </div>
      }
    </div>
  );
}

export default MessageBox;
