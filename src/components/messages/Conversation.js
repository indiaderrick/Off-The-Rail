import React from 'react';
import MessageBox from './MessageBox';

function Conversation({ messages, withWhichUserId, handleDelete }) {
  const filtered = messages && messages.filter(message =>
    message.from._id === withWhichUserId || message.to._id === withWhichUserId
  );
  return (
    <div>
      {filtered && filtered.map(message =>
        <MessageBox key={message._id} message={message} handleDelete={handleDelete} />
      )}
    </div>
  );
}

export default Conversation;
