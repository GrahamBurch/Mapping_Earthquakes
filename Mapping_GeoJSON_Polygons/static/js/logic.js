// Check that program is running
console.log('working...');

// Creating dark tile layer
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Creating light tile layer
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Creating basic map object centered on Toronto with the default 'light' layer bound to it
let map = L.map('mapid', {
    center: [44.0, -80.0],
    zoom: 11,
    layers: [satelliteStreets]
})

// Accessing Toronto neighborhoods GeoJSON URL
let torontoHoods = 'https://raw.githubusercontent.com/GrahamBurch/Mapping_Earthquakes/Mapping_GeoJSON_Polygons/torontoNeighborhoods.json';

// Create a style object for the route lines
let myStyle = {
    color: '#ffffa1',
    weight: 2
}

// Grabbing the GeoJSON data
d3.json(torontoHoods).then(function(data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data
    L.geoJSON(data).addTo(map);
});

// Combine light and dark layers into one baseMaps object
let baseMaps = {
    SatelliteStreets: satelliteStreets,
    Streets: streets
};

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);