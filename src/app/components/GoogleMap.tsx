"use client";

//import defineConfig from "@/utils/config";
import {
  APIProvider,
  InfoWindow,
  Map,
  Marker,
  useMap,
  useMapsLibrary,
  useMarkerRef,
} from "@vis.gl/react-google-maps";
import { coordinates } from "@/utils/index";
import { useEffect, useState } from "react";
import { CustomMarker } from "./Marker";

const GoogleMap = () => {
  const map = useMap();
  const [markerRef, marker] = useMarkerRef();

  const placesLibray = useMapsLibrary("places");
  const [placeService, setPlaceService] = useState(null);

  useEffect(() => {
    if (!placesLibray || !map) return;
    const newPlace = new placesLibray.PlacesService(map);
    setPlaceService(newPlace);
  }, [map, placeService]);

  useEffect(() => {
    if (!placeService) return;
  }, [placeService]);

  return (
    <APIProvider apiKey={process.env.GOOGLE_MAP_API_KEY as string}>
      <Map
        style={{ width: "100vw", height: "100vh" }}
        defaultCenter={coordinates.nyabugogo}
        defaultZoom={8}
        gestureHandling={"greedy"}
        disableDefaultUI={false}
      >
        <Marker ref={markerRef} position={coordinates.nyabugogo}></Marker>
        <Marker ref={markerRef} position={coordinates.stopA} />
        <Marker ref={markerRef} position={coordinates.stopB} />
        <Marker ref={markerRef} position={coordinates.stopC} />
        <Marker ref={markerRef} position={coordinates.stopD} />
        <Marker ref={markerRef} position={coordinates.stopE} />
        <Marker ref={markerRef} position={coordinates.kimironko} />
      </Map>
    </APIProvider>
  );
};

export default GoogleMap;
