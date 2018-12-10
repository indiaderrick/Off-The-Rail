import React from 'react';
import { tokenUserId } from '../../lib/auth';

function messagesInConversation(obj, message){
  console.log('this is message.to._id', message.to._id);
  const otherUser = message.to._id === tokenUserId() ?
    message.from : message.to;
  if(!obj[otherUser._id]) {
    obj[otherUser._id] = {
      user: otherUser, count: 1
    };
  } else obj[otherUser._id].count++;
  return obj;
}

function Sidebar({ messages, handleClick }){
  const messageCounts = messages &&
    messages.reduce(messagesInConversation, {});

  return(
    <div>
      {messageCounts &&
          Object.keys(messageCounts)
            .map(userId =>
              <div key={userId} className="media" onClick={() => handleClick(userId)}>
                <div className="media-content">
                  <div className="content">
                    <strong><span>{messageCounts[userId].user.profilePicture}</span>{messageCounts[userId].user.name}</strong> ({messageCounts[userId].count})
                  </div>
                </div>
              </div>
            )
      }
    </div>
  );
}

export default Sidebar;
