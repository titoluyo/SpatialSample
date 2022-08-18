import { Loader } from "@googlemaps/js-api-loader";

let key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
console.log('key', key);

const loader = new Loader({
    apiKey: key,
    version: "weekly",
    libraries: ["places"]
  });

let map: google.maps.Map;

const center = {
    lat: -12.119274,
    lng: -77.029075,
};

const mapOptions = {
    center: center,
    zoom: 8
  };

loader
  .load()
  .then((google) => {
    map = new google.maps.Map(document.getElementById("map") as HTMLElement, mapOptions);

    map.data.loadGeoJson(
        "http://localhost:5000/departamentos/15"
    );
  })
  .catch(e => {
    // do something
  });

// function initMap(): void {
//     map = new google.maps.Map(document.getElementById("map") as HTMLElement, mapOptions);

//     map.data.loadGeoJson(
//         "http://localhost:5000/departamentos/15"
//     );
// }

// declare global {
//     interface Window {
//         initMap: () => void;
//     }
// }
// window.initMap = initMap;
export { };
