import React from 'react';

function TextColumn({ item }) {
  console.log('this is addedBy', item.addedBy);
  return (
    <article>
      <div>
        <h3 >{item.name}</h3>

        <p> {item.description}</p>
        <button> Message User </button>
        <button> BUY </button>
        <hr></hr>
      </div>

    </article>
  );
}

export default TextColumn;

//added by!!
// <p> ADDED BY: {item.addedBy.name}</p>
// <p> <i className="fas fa-map-marker-alt"></i> {item.addedBy.city}</p>
