import React from 'react';
import { Map, TileLayer, Marker, Popup} from 'react-leaflet';


const UserMap = ({ userPosition, user }) => {

  return(
    <div id="map">
      {
        user &&
        <Map center={  user.location } zoom={14}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />

          {userPosition && <Marker position={userPosition}>
            <Popup>
          You!
            </Popup>
          </Marker>}
          {
            user &&
            <Marker position={[user.location.lat, user.location.lng]}>
              <Popup>
                {user.name}
              </Popup>
            </Marker>
          }


        </Map>
      }
    </div>
  );
};

export default UserMap;
// <Marker >
// <Popup>
// You!
// </Popup>
// </Marker>
//
// <Marker key={user._id} position={[user.location.lat, user.location.lng]}>
// <Popup>
// {user.name}
// </Popup>
// </Marker>
