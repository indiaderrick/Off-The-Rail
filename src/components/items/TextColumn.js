import React from 'react';

function TextColumn({ item }) {
  console.log('this is addedBy', item.addedBy);
  return (
    <article className="column is-4">
      <div>
        <h3 >{item.name}</h3>
        <p> ADDED BY: {item.addedBy.name}</p>
        <p>  {item.addedBy.city}</p>
        <p> {item.description}</p>
        <button> Message User </button>
        <button> BUY </button>
        <hr></hr>
      </div>

    </article>
  );
}

export default TextColumn;
