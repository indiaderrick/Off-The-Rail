import React from 'react';
import { decodeToken } from '../../lib/auth';

function ComposeMessage(props){
  return(
    <article className="media">
      <div className="media-left">
        <p className="image is-64x64"> {decodeToken().name}</p>
      </div>
      <div className="media-content">

        <div className="field">
          <p className="control">
            <textarea className="textarea" placeholder="Write a response..." name="newMessage" value={props.newMessage || ''} onChange={props.handleChange} disabled={!props.withWhichUserId}/>
          </p>
        </div>

        <nav className="level">
          <div className="level-left">
            <div className="level-item" onClick={props.handleSubmit}>
              <a className="button is-info" disabled={!props.withWhichUserId}>Submit</a>
            </div>
          </div>
        </nav>

      </div>

    </article>
  );
}

export default ComposeMessage;
