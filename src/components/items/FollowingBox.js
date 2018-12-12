import React from 'react';

function FollowingBox({ name, image, location }){
  return(
    <div className="image is-48x48 footerText">
      <img src={image} className="border"/>
      <p> {name}</p>
      <p> {location} </p>
    </div>
  );
}
export default FollowingBox;
