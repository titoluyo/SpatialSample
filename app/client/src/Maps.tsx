import { memo, useMemo, useState, useCallback } from 'react'
// import PropTypes from 'prop-types'
import {
    GoogleMap,
    Data,
    useLoadScript,
    Marker,
    //  InfoWindow,
} from "@react-google-maps/api";

// const ExampleDataPropTypes = {
//     styles: PropTypes.shape({
//         container: PropTypes.object.isRequired,
//     }).isRequired,
// }

// const libraries = ["places"];
const mapContainerStyle = {
    height: "82vh",
    width: "95vw",
};

// const center = {
//     lat: -12.119274,
//     lng: -77.029075,
// };
const center: google.maps.LatLngLiteral = {
    lat: -12.0561578,
    lng: -77.0845196,
}

const onClick = (...args: any[]) => {
    console.log(
        'onClick args: ',
        args[0].latLng.lat(),
        ' : ',
        args[0].latLng.lng()
    )
}

const onDataLoad = (data: google.maps.Data) => {
    console.log('data: ', data)
}

// interface Props {
//     styles: {
//         container: CSSProperties | undefined
//     }
// }

function Maps() {
    const [map, setMap] = useState<google.maps.Map | null>(null)

    const onMapLoad = useCallback((map: google.maps.Map) => {
        console.log('map.data: ', map.data)
        map.data.loadGeoJson('http://localhost:5000/departamentos/15')
        setMap(map)
    }, [])

    const dataOptions = useMemo<google.maps.Data.DataOptions | null>(() => {

        return map !== null ? {
            map,
            controlPosition: google.maps.ControlPosition.TOP_LEFT,
            controls: ['Point'],
            drawingMode: 'Point', //  "LineString" or "Polygon".
            featureFactory: (geometry: google.maps.Data.Geometry): google.maps.Data.Feature => {
                console.log('geometry: ', geometry)

                return new google.maps.Data.Feature({
                    id: '1',
                    geometry
                })
            }
        } : null
    }, [map])

    var gkey: string = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: gkey,
        // libraries: libraries,
    });

    if (loadError) return <div>Error</div>;
    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className='map' >
            <div className='map-container'>
                <GoogleMap
                    id="map"
                    mapContainerStyle={mapContainerStyle}
                    zoom={8}
                    center={center}
                    onClick={onClick}
                    onLoad={onMapLoad}
                >
                    <Marker
                        key={`MyLocation`}
                        position={center}
                    >
                    </Marker>

                    {dataOptions !== null ? (<Data onLoad={onDataLoad} options={dataOptions} />) : null}
                </GoogleMap>
            </div>
        </div >
    )
}

// Maps.propTypes = ExampleDataPropTypes
export default memo(Maps)