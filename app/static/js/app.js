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
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: lima,
        zoom: 8
    });
    var marker = new google.maps.Marker({position: lima, map: map});
    map.data.loadGeoJson(
      'http://localhost:5000/provincias/15');
}