import { Marker, MarkerRef } from '@vis.gl/react-google-maps';
import * as React from 'react';



export function CustomMarker ({
    markerRef
}: {markerRef:MarkerRef}) {
  return (
    <div>
    <Marker ref={markerRef} position={{lat: 53.54992, lng: 10.00678}} />
      
    </div>
  );
}
