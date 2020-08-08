function sendPost(url, data, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            callback(json);
        }
    };
    let jsonData = JSON.stringify(data);
    xhr.send(jsonData);
}

var lima = {lat: -12.1007574, lng: -77.0275498};
var map;
var marker;
function initMap(listener) {
    map = new google.maps.Map(document.getElementById("map"), {
        center: lima,
        zoom: 8
    });

    map.addListener('click', function (event) {
        marker = new google.maps.Marker({
            position: event.latLng,
            map: map,
            draggable: true,
        });
        marker.addListener('dragend', function (event) {
            let loc = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
            };
            console.log(loc);
        });
    });
    // map.data.loadGeoJson(
    //   'http://localhost:5000/provincias/15');
}