/*
var map;
function initialize() {
    var canvas = document.getElementById('map-canvas');
    var mapOptions = {
        zoom: 16,
        //center: {lat: -12.100757399999999, lng: -77.0275498}
        center : new google.maps.LatLng(-12.100757399999999, -77.0275498)
    };
    map = new google.maps.Map(canvas,mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);
*/


var map;
function initMap() {
    let lima = {lat: -12.1007574, lng: -77.0275498};
    map = new google.maps.Map(document.getElementById("map"), {
        center: lima,
        // center : new google.maps.LatLng(-12.1007574, -77.0275498),
        // center: { lat: -34.397, lng: 150.644 },
        zoom: 8
    });
    var marker = new google.maps.Marker({position: lima, map: map});
    map.data.loadGeoJson(
      'http://localhost:5000/provincias/15');
}