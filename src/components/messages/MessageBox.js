import React from 'react';
import moment from 'moment';
import { tokenUserId } from '../../lib/auth';

function MessageBox({ message, handleDelete }) {
  return (
    <div className="media messageBox" key={message._id}>
      <figure className="media-left">
        <p className="image is-48x48">
          <img className="profileImage" src={message.from.profilePicture}/>
        </p>
      </figure>
      <div className="media-content">
        <div className="content">
          <p>{
            (message && tokenUserId() === message.from._id)
              ?
              <div>
                <strong className="messageFrom">{message.from.username}</strong>
                <br />
              </div>
              :
              <div>
                <strong className="fromThem">{message.from.username}</strong>
                <br />
              </div>
          }
          {message.content}
          <br />
          <small>{moment(message.createdAt).fromNow()}</small>
          </p>
        </div>
      </div>
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
