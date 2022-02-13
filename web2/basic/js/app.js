var map;
// Initialize and add the map
function initMap() {
  const location = { lat: -12.112665, lng: -77.031341 };
  // The map, centered at location
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: location,
  });
  // The marker, positioned at location
  const marker = new google.maps.Marker({
    position: location,
    map: map,
  });

  initDrawing();
}

function initDrawing() {
  const drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.MARKER,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [
        google.maps.drawing.OverlayType.MARKER,
        google.maps.drawing.OverlayType.CIRCLE,
        google.maps.drawing.OverlayType.POLYGON,
        google.maps.drawing.OverlayType.POLYLINE,
        google.maps.drawing.OverlayType.RECTANGLE,
      ],
    },
    markerOptions: {
      icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    },
    circleOptions: {
      fillColor: "#ffff00",
      fillOpacity: 1,
      strokeWeight: 5,
      clickable: false,
      editable: true,
      zIndex: 1,
    },
  });

  drawingManager.setMap(map);
}

function showDepartamento() {
  console.log("showDepartamento");
  const departamentoId = document.getElementById("departamentoId").value;
  loadDepartamento(departamentoId);
}

function loadDepartamento(departamentoId) {
  console.log("loadDepartamento");
  console.log(departamentoId);
  const urlBase = "https://localhost:7009";
  let url = `${urlBase}/api/departamentos/${departamentoId}`;
  console.log(url);
  fetch(url).then((response) => {
    console.log("response");
    console.log(response);
    response.json().then((data) => {
      console.log(data);
      let geom = JSON.parse(data.geomJson);
      console.log(geom);
      map.data.addGeoJson(geom);
    });
  })
}