var pos = [-12.112665, -77.031341]

var map = L.map('map').setView(pos, 16);

// var drawnItems = new L.FeatureGroup();
// map.addLayer(drawnItems);
// var drawControl = new L.Control.Draw({
//     edit: {
//         featureGroup: drawnItems
//     }
// });
// map.addControl(drawControl);

/*
var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);
*/

var tiles2 = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
    foo: 'bar', 
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


function showDepartamento() {
    console.log("showDepartamento");
    const departamentoId = document.getElementById("departamentoId").value;
    loadDepartamento(departamentoId);
}

function loadDepartamento(departamentoId) {
    console.log("loadDepartamento");
    console.log(departamentoId);
    // const urlBase = "https://localhost:7009";
    // let url = `${urlBase}/api/departamentos/${departamentoId}`;
    const urlBase = "http://localhost:5000";
    let url = `${urlBase}/departamentos/${departamentoId}`;
    console.log(url);
    fetch(url).then((response) => {
        console.log("response");
        console.log(response);
        response.json().then((data) => {
        console.log(data);
        let geom = JSON.parse(data.geomJson);
        console.log(geom);
        //map.data.addGeoJson(geom);
        L.geoJSON(geom).addTo(map);
    });
})
}