import React from 'react';
import {
    GoogleMap,
    useLoadScript,
    Marker,
  //  InfoWindow,
  } from "@react-google-maps/api";

// const libraries = ["places"];
const mapContainerStyle = {
height: "100vh",
width: "100vw",
};
const center = {
lat: -12.119274,
lng: -77.029075,
};

function Maps() {
    console.log('process.env.REACT_APP_GOOGLE_MAPS_API_KEY');
    console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
    var gkey: string = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: gkey,
        // libraries: libraries,
    });

    if (loadError) return <div>Error</div>;
    if (!isLoaded) return <div>Loading...</div>;

    return <GoogleMap
            id="map"
            mapContainerStyle={mapContainerStyle}
            zoom={16}
            center={center}
            >
                <Marker
                    key={`MyLocation`}
                    position={center}
                >
                </Marker>
            </GoogleMap>
}

export default Maps;
