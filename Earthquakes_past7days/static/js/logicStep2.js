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

// Creating basic **map object** centered on the geographical center of the US with the default 'streets' layer bound to it
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 11,
    layers: [satelliteStreets]
})

// This function determines the radius of the earthquake marker based on its magnitude.
function getRadius(magnitude) {
    if (magnitude === 0) {
        return 1;
    }
    return magnitude * 4;
}

// This function returns the style for each earthquake by taking in the earthquake's magnitude as an argument.
function styleInfo(feature) {
    return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: '#ffae42',
        color: '#00000',
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
    };
}

// Create a style object for the route lines
let myStyle = {
    color: '#ffffa1',
    weight: 2
}

// Grabbing the GeoJSON data
d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson').then(function(data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data
    L.geoJSON(data, {

        // Turn each feature into a circleMarker on the map
        pointToLayer: function(feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
        },

        // Set the style for each circleMarker using our styleInfo function
        style: styleInfo
    }).addTo(map);
});

// Create a base **layer** to hold both maps.
let baseMaps = {
    Satellite: satelliteStreets,
    Streets: streets
};

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

