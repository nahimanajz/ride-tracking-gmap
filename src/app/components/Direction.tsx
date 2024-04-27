"use client";
import {
  APIProvider,
  Map,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import React, { useEffect, useState } from "react";

type Props = {};

function Direction({}: Props) {
    
  const map = useMap();

  const routesLibrary = useMapsLibrary("routes");
  const [directionServices, setDirectionService] =
    useState<google.maps.DirectionsService>();
  const [directionRenderer, setDirectionRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionService(new routesLibrary.DirectionsService());
    setDirectionRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionServices || !directionRenderer) return;

    directionServices
      .route({
        origin: "100 Front St, Toronto ON",
        destination: "500 College St, Toronto ON",
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionRenderer.setDirections(response);
        console.log(response);
        setRoutes(response.routes);
      });
    if (!leg) return null;
  }, [directionServices, directionRenderer]);

  useEffect(() => {
    if (!directionRenderer) return;
    directionRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionRenderer]);

  return (
    <APIProvider apiKey={process.env.GOOGLE_MAP_API_KEY as string}>
      <Map
        style={{ width: "90vw", height: "100vh" }}
        defaultCenter={{ lat: 43.6532, lng: -79.3832 }}
        zoom={8}
        mapId={"af05000b0a963f19"}
        gestureHandling={"greedy"}
        disableDefaultUI={false}
      ></Map>
      <div className="z-1 bg-slate-300">
        <h2>{selected?.summary}</h2>
        <p>
          {leg?.start_address.split(", ")[0]} to{" "}
          {leg?.end_address.split(",")[0]}
        </p>
        <p>
          Distance: {leg?.distance?.text}
          Duration: {leg?.duration?.text}
        </p>
        <ul>
          {routes.map((route, index) => (
            <li key={route.summary}>
              <button onClick={() => setRouteIndex(index)}>
                {route.summary}{" "}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </APIProvider>
  );
}

export default Direction;
