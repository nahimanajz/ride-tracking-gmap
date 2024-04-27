"use client";

import { RoutesClient } from "@googlemaps/routing";

const GoogleMap = () => {
  const routingClient = new RoutesClient();
  const callComputeRoutes = async () => {
    const origin = {
      lat: "-1.939826787816454",
      lng: "30.0445426438232",
    };
    const destination = {
      lat: "-1.9365670876910166",
      lng: "30.13020167024439",
    };

    const request = {
      origin,
      destination,
    };
    const response = await routingClient.computeRoutes(request);
    console.log(response);
  };
  callComputeRoutes();
};

export default GoogleMap;
