mapboxgl.accessToken =
    'pk.eyJ1IjoiZ3VydXByZWV0MjAxIiwiYSI6ImNrdWY1b3k1cTFxbDcycGxtcDhmZHV4bXEifQ.qQaihb4-tDhPSurwtltCyw';

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
    enableHighAccuracy: true
});

function successLocation(position) {
    console.log(position);
    setMap([position.coords.longitude, position.coords.latitude]);
}

function errorLocation() {
    setMap([21.1458, 79.08820])
}

function setMap(center) {
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom: 11,
        light: {
            "anchor": "viewport",
            "color": "white",
            "intensity": 0.4
        }
    });
}