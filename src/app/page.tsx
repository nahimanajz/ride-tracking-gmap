
import MapComponent from "./components/MapComponent";
import MapWithADirectionsRenderer from "./components/MapComponent";

/**
 * Embed direction api to calculate direction between two location
 * show realtime traffic update, waypoints, and transportation mode likek driving, walking, or cycling
 * transportation modes, such as driving, walking, or cycling, a
 * 
 */
export default function Home() {
/**
  * Show intractive map displaying entire route with marked stops
  * Show driver current location
  * Assume constant speed and calculate and display the ETA for the next stop
 */


  return (
    <main>
      {/* <GoogleMap /> */} {/** Places */}
       {/* <Direction /> */}
           <MapComponent />   
       </main>
  );
}
