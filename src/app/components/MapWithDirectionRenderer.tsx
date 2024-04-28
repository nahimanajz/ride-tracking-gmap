"use client";
import { compose, withProps, lifecycle } from "recompose";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} from "react-google-maps";
//AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg
const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL:
      `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP_API_KEY as string}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();

      DirectionsService.route(
        {
          origin: new google.maps.LatLng(41.85073, -87.65126),
          destination: new google.maps.LatLng(41.85258, -87.65141),
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result,
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    },
  })
)((props) => (
  <GoogleMap
    defaultZoom={7}
    defaultCenter={new google.maps.LatLng(41.85073, -87.65126)}
  >
    {/* {props.directions && <DirectionsRenderer directions={props.directions} />} */}
  </GoogleMap>
));

export default MapWithADirectionsRenderer;