


//
// $.ajax({
//     url:"http://api.brewerydb.com/v2/?key=c7522aeef54280ac173d168a0e08d9bb/locations",
//     method: 'GET',
//     dataType: 'json'
//   }).done(function(response){
//     console.log(response);
//   }).fail(function(err){
//     console.log("fail");
//     console.log(err);
//   });

initMap();


////////////// Map + Geolocation \\\\\\\\\\\\\\\
var map;
var heatmap;
var pos;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.775, lng: -122.434},
    zoom: 13
  });

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: getPoints(),
    map: map
  });

  var infoWindow = new google.maps.InfoWindow({map: map});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    gps(infoWindow);
    getPoints();
    toggleHeatmap();
    changeGradient();
    changeRadius();
    changeOpacity();
    console.log(pos, 'outside of the function');
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function gps(infoWindow){
  navigator.geolocation.getCurrentPosition(function(position) {
    pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    console.log("gps");

    var url = "http://galvanize-cors-proxy.herokuapp.com/https://api.brewerydb.com/v2/search/geo/point?lat="+pos.lat.toString()+"&lng="+pos.lng.toString()+"&key=c7522aeef54280ac173d168a0e08d9bb"
    console.log(url);

    $.ajax({
        url: url,
        // /search/geo/point?lat=35.772096&lng=-78.638614
        method: 'GET',
        dataType: 'json'
      }).done(function(response){
        console.log(response);
      }).fail(function(err){
        console.log("fail");
        console.log(err);
      });

    console.log(pos, 'inside the function');
    infoWindow.setPosition(pos);
    infoWindow.setContent('Location found.');
    map.setCenter(pos);
    }, function() {
    handleLocationError(true, infoWindow, map.getCenter());
  });
}



console.log("something");


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}

////////////// HeatMap Layer + Buttons \\\\\\\\\\\\\\\


function toggleHeatmap() {
  heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
  var gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
  ]
  heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
  heatmap.set('radius', heatmap.get('radius') ? null : 20);
}

function changeOpacity() {
  heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
}

////////////// Sets Points to Generate Heatmap \\\\\\\\\\\\\\\
function getLatLng() {

}
function getPoints() {
  return [new google.maps.LatLng(39.756297 , -104.991249)];
}


////////Search\\\\\\\\\
