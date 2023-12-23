import React from 'react';
import { Marker } from 'react-native-maps';

const LocalMarker = ({ location }) => (
  <Marker
    coordinate={{ latitude: location.latitude, longitude: location.longitude }}
    title={location.name}
  />
);

export default LocalMarker;
