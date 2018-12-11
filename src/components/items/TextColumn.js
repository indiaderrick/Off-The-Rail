import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../lib/auth';

function TextColumn({ item, handleDelete }) {
  console.log('this is addedBy', item.addedBy);
  return (
    <article>
      <div>
        <strong className="strong">{item.name}</strong>
        { isAuthenticated()
          ?
          <Link to={`/users/${item.addedBy._id}`}> <p> ADDED BY: {item.addedBy.name}</p></Link>
          :
          <p> ADDED BY: {item.addedBy.name} </p>
        }

        <p> <i className="fas fa-map-marker-alt"></i> {item.addedBy.city}</p>

        <p> {item.description}</p>
        <button className="button is-danger" onClick={handleDelete}> Delete </button>
        <div>
          <br />
          <Link to={`/items/${item._id}/edit`}><button className="button is-primary"> Edit Item </button></Link>
        </div>
        <hr></hr>
      </div>

    </article>
  );
}

export default TextColumn;

//added by!!
