import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../lib/auth';

function TextColumn({ item, handleDelete }) {
  console.log('this is addedBy', item.addedBy);
  return (
    <article>
      <div>
        <h3 >{item.name}</h3>
        { isAuthenticated()
          ?
          <Link to={`/users/${item.addedBy._id}`}> <p> ADDED BY: {item.addedBy.name}</p></Link>
          :
          <p> ADDED BY: {item.addedBy.name} </p>
        }

        <p> <i className="fas fa-map-marker-alt"></i> {item.addedBy.city}</p>

        <p> {item.description}</p>
        <button onClick={handleDelete}> Delete </button>
        <hr></hr>
      </div>

    </article>
  );
}

export default TextColumn;

//added by!!
