const CONFIGURATION = {
    "locations": [
      {"title":"Lima","address1":"Lima","address2":"Peru","coords":{"lat":-12.046439006487459,"lng":-77.0427379067459},"placeId":"ChIJxz7uGfbFBZERSi5FzLlsIBQ"}
    ],
    "mapOptions": {"center":{"lat":38.0,"lng":-100.0},"fullscreenControl":true,"mapTypeControl":false,"streetViewControl":false,"zoom":4,"zoomControl":true,"maxZoom":17},
    "mapsApiKey": "AIzaSyDu4pG0CEI6EnSft0KT-agVbhD3m1nBzpA"
  };

  function initMap() {
    new LocatorPlus(CONFIGURATION);
  }
