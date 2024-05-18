// Creating the map object
let myMap = L.map("map", {
    center: [40.7128, -74.0059],
    zoom: 5
  });

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Use this link to get the GeoJSON data.
let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// Define a markerSize() function that will give each city a different radius based on its population.
function markerColor(depth) {
    let color = "";
    if (depth >= -10 && depth <= 10) {
        color = "#6aa84f";
    }
    else if (depth > 10 && depth <= 30) {
        color = "#8fce00";
    }
    else if (depth > 30 && depth <= 50) {
        color = "#ffd966";
    }
    else if (depth > 50 && depth <= 70) {
        color = "#f6b26b";
    }
    else if (depth > 70 && depth <= 90){
        color = "orange";
    }
    else {
        color = "red";
    }
    return color;
  }

// Getting our GeoJSON data
d3.json(link).then(function(data) {
  // Creating a GeoJSON layer with the retrieved data
  console.log(data);
  features = data.features;

  for (let i = 0; i < features.length; i++) {
    let location = features[i].geometry;
    L.circle([location.coordinates[1], location.coordinates[0]], {
        fillOpacity: 1,
        color: markerColor(location.coordinates[2]),
        fillColor: markerColor(location.coordinates[2]),
        radius:  features[i].properties.mag * 10000
      }).bindPopup(`<h1>${features[i].properties.title}</h1> <hr> <h3>Magnitude: ${features[i].properties.mag}</h3> <h3>Location: ${location.coordinates[1]}, ${location.coordinates[0]}</h3> <h3>Depth: ${location.coordinates[2]}</h3>`).addTo(myMap);
}

});
