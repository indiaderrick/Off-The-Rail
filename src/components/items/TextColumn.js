import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated, tokenUserId } from '../../lib/auth';

function TextColumn({ item, handleDelete, saveForLater, unsave }) {
  console.log('this is addedBy', item.addedBy);

  return (
    <article>
      <strong className="strong">SAVE £{item.retailPrice - item.newPrice}</strong>
      { isAuthenticated()
        ?
        <Link to={`/users/${item.addedBy._id}`}> <p> ADDED BY: {item.addedBy.name}</p></Link>
        :
        <p> ADDED BY: {item.addedBy.name} </p>
      }
      <div className="column">
        <p> <i className="fas fa-map-marker-alt"></i> {item.addedBy.city}</p>
        <p className="blue"> Originally (£{item.retailPrice}) from <span><strong>{item.originallyFrom}</strong></span>. Get it here for <span><strong>£{item.newPrice}!</strong></span></p>
        <div>
          <p> {item.description}</p>
        </div>
      </div>
      {
        (tokenUserId() === item.addedBy._id)
        &&
        <div>
          <button className="button is-danger" onClick={handleDelete}> Delete </button>
          <div>
            <br />
            <Link to={`/items/${item._id}/edit`}><button className="button is-primary"> Edit Item </button></Link>
          </div>
        </div>
      }
      <hr></hr>
      {
        (tokenUserId() !== item.addedBy._id)
        &&
        <div>
          {
            (item && item.savedForLater.includes(tokenUserId()))
              ?
              <button className="button heart" onClick={unsave}> <i className="fas fa-heart"></i> </button>
              :
              <button className="button heart" onClick={saveForLater}> <i className="far fa-heart"></i> </button>
          }
        </div>
      }
    </article>
  );
}

export default TextColumn;
