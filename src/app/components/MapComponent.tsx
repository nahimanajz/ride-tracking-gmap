"use client";
import { Eta } from "@/utils/types";
import { useEffect, useState } from "react";

const MapComponent = () => {
  const [journeyInfo, setJourneyInfo] = useState<Eta>();
  useEffect(() => {
    const loadMap = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP_API_KEY}&callback=initMap`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    };

    loadMap();
  }, []);

  const initMap = () => {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 14,
    });
    directionsRenderer.setMap(map);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          map.setCenter(pos);

          const marker = new google.maps.Marker({
            position: pos,
            map: map,
            title: "Your Location",
          });

          const request = {
            origin: pos,
            destination: { lat: -1.9365670876910166, lng: 30.13020167024439 }, // Kimironko
            travelMode: "DRIVING",
            waypoints: [
              {
                location: new google.maps.LatLng(
                  -1.9355377074007851,
                  30.060163829002217
                ),
              }, // Stop A
              {
                location: new google.maps.LatLng(
                  -1.9358808342336546,
                  30.08024820994666
                ),
              }, // Stop B
              {
                location: new google.maps.LatLng(
                  -1.9489196023037583,
                  30.092607828989397
                ),
              }, // Stop C
              {
                location: new google.maps.LatLng(
                  -1.9592132952818164,
                  30.106684061788073
                ),
              }, // Stop D
              {
                location: new google.maps.LatLng(
                  -1.9487480402200394,
                  30.126596781356923
                ),
              }, // Stop E
            ],
            optimizeWaypoints: true,
          };

          directionsService.route(request, function (result, status) {
            if (status === "OK") {
              directionsRenderer.setDirections(result);
            } else {
              window.alert("Directions request failed due to " + status);
            }
          });
        },
        function () {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      handleLocationError(false, infoWindow, map.getCenter());
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: pos,
        zoom: 14,
      });

      const content = browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation.";

      const infowindow = new google.maps.InfoWindow({
        content: content,
      });

      const marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: "Error",
      });

      marker.addListener("click", function () {
        infowindow.open(map, marker);
      });
    }

    const waypoints = [
      {
        location: new google.maps.LatLng(
          -1.9355377074007851,
          30.060163829002217
        ),
      }, // Stop A
      {
        location: new google.maps.LatLng(
          -1.9358808342336546,
          30.08024820994666
        ),
      }, // Stop B
      {
        location: new google.maps.LatLng(
          -1.9489196023037583,
          30.092607828989397
        ),
      }, // Stop C
      {
        location: new google.maps.LatLng(
          -1.9592132952818164,
          30.106684061788073
        ),
      }, // Stop D
      {
        location: new google.maps.LatLng(
          -1.9487480402200394,
          30.126596781356923
        ),
      }, // Stop E
    ];

    waypoints.forEach(function (waypoint, index) {
      const marker = new google.maps.Marker({
        position: waypoint.location,
        map: map,
        title: "Stop " + String.fromCharCode(65 + index),
      });

      marker.addListener("click", function () {
        calculateRemainingDistance(marker.getPosition());
      });
    });

    function calculateRemainingDistance(waypoint) {
      const request = {
        origin: waypoint,
        destination: { lat: -1.9365670876910166, lng: 30.13020167024439 }, // Kimironko
        travelMode: "DRIVING",
      };

      directionsService.route(request, function (result, status) {
        if (status === "OK") {
          const route = result.routes[0];
          let remainingDistance = 0;
          let remainingTime = 0;

          for (let i = 0; i < route.legs.length; i++) {
            remainingDistance += route.legs[i].distance.value;
            remainingTime += route.legs[i].duration.value;
          }

          remainingDistance = remainingDistance / 1000;
          remainingTime = remainingTime / 60;

          setJourneyInfo({
            distance: remainingDistance.toFixed(2),
            time: remainingTime.toFixed(0),
          });
        } else {
          window.alert("Directions request failed due to " + status);
        }
      });
    }
  };

  return (
    <div className="flex gap-[20px] flex-col">
      <div className="bg-tomato-400 px-[16px] py-[20px] flex flex-col">
        <div className="font-bold text-[20px] text-[#333]">
          Nyabugogo - Kimironko
        </div>
        <div className="flex  justify-between text-slate-600">
          <span>Distance: {journeyInfo?.distance ?? 0} km</span>
          <span>Time: {journeyInfo?.time ?? 0} minutes</span>
        </div>
        <div className="text-base text-slate-600">
          Next stop: {journeyInfo?.nextStop}
        </div>
      </div>
      <div id="map" className="z-0 w-full h-screen" />
    </div>
  );
};

export default MapComponent;
