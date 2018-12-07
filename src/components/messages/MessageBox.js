import React from 'react';
// import moment from 'moment';
// import { tokenUserId } from '../../lib/auth';

function MessageBox({ message}) {
  return (
    <p>  {message.content} </p>
  );
}

export default MessageBox;


//
// <div className="media" key={message._id}>
// <figure className="media-left">
// <p className="image is-64x64">
// <img src={message.from.image}/>
// </p>
// </figure>
// <div className="media-content">
// <div className="content">
// <p>
// <strong>{message.from.username}</strong>
// <br />
//
//
//
// <p>  {message.content} </p>
//
//
//         <br />
//         <small>{moment(message.createdAt).fromNow()}</small>
//       </p>
//     </div>
//   </div>
//   {
  //       message.from._id === tokenUserId() &&
  //         <div className="media-right">
  //           <button className="delete" onClick={() => handleDelete(message._id)}></button>
  //         </div>
  //     }
  //   </div>
