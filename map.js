
var map = L.map("map").setView([20.5937, 78.9629], 5); 
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var drawControl = new L.Control.Draw({
  edit: { featureGroup: drawnItems },
  draw: {
    polygon: true,
    rectangle: true,
    circle: false,
    marker: false,
    polyline: false,
  },
});
map.addControl(drawControl);

map.on(L.Draw.Event.CREATED, async function (event) {
  var layer = event.layer;
  drawnItems.addLayer(layer);

  var latlng = layer.getBounds().getCenter();
  var lat = latlng.lat.toFixed(6);
  var lon = latlng.lng.toFixed(6);

  
  document.getElementById("info").innerHTML = `
    <strong>Selected Area:</strong><br>
    📍 Latitude: ${lat}, Longitude: ${lon} <br>
    🌍 Population Density: Fetching... <br>
    💧 Water Level: Fetching...
  `;

  
  let population = await getPopulationDensity(lat, lon);
  let waterLevel = await getWaterLevel(lat, lon);

  
  document.getElementById("info").innerHTML = `
    <strong>Selected Area:</strong><br>
    📍 Latitude: ${lat}, Longitude: ${lon} <br>
    🌍 Population Density: ${population} <br>
    💧 Water Level: ${waterLevel}
  `;
});

async function getPopulationDensity(lat, lon) {
  try {
    let response = await fetch(
      `https://api.worldpop.org/v1/services/stats?dataset=wpgp&latitude=${lat}&longitude=${lon}`
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    let data = await response.json();
    console.log("WorldPop Response:", data); 

    return data.data ? `${data.data.population} people/km²` : "No population data";
  } catch (error) {
    console.error("Population API Error:", error);
    return "Error fetching population data";
  }
}

async function getWaterLevel(lat, lon) {
  try {
    let response = await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        "https://real-water-api.com/data?lat=" + lat + "&lon=" + lon
      )}`
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    let data = await response.json();
    let jsonData = JSON.parse(data.contents); 
    console.log("Water API Response:", jsonData); 

    return jsonData.water_level ? `${jsonData.water_level} meters` : "No water level data";
  } catch (error) {
    console.error("Water Level API Error:", error);
    return "Error fetching water data";
  }
}

