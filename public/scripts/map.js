

////////////// Map + Heatmap Creation \\\\\\\\\\\\\\\
// var map;
var heatmap;
var pos;
var brewLatLng = [];
var map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 37.775, lng: -122.434},
  zoom: 13
});
initMap();

function initMap() {

  var infoWindow = new google.maps.InfoWindow({map: map});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    gps(infoWindow);
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

}

////////// Geolocation with Brewery Heatmap\\\\\\\\\\\

function gps(infoWindow){
  navigator.geolocation.getCurrentPosition(function(position) {
    pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    console.log("gps");

    var url = "https://galvanize-cors-proxy.herokuapp.com/https://api.brewerydb.com/v2/search/geo/point?lat="+pos.lat.toString()+"&lng="+pos.lng.toString()+"&key=c7522aeef54280ac173d168a0e08d9bb"
    console.log(url);

    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json'
      }).done(function(response){
        var breweryArray = response.data
        $.each(breweryArray, function(index) {
          var brewLat = response.data[index]["latitude"];
          var brewLng = response.data[index]["longitude"];
          brewLatLng.push([brewLat, brewLng]);
        });
      }).then(function(data) {
        var heatmapPoints = getPoints(brewLatLng);
        heatmap = new google.maps.visualization.HeatmapLayer({
          data: heatmapPoints,
          map: map,
          radius: 50

        });
        initialize();

      }).fail(function(err){
        console.log("fail");
        console.log(err);
      });
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
$(".js-toggle-heatmap").on("click", function() {
  toggleHeatmap(heatmap)
})

$(".js-change-gradient").on("click", function() {
  changeGradient(heatmap)
})

$(".js-change-opacity").on("click", function() {
  changeOpacity(heatmap)
})

$(".js-change-radius").on("click", function() {
  changeRadius(heatmap)
})

function toggleHeatmap(heatmap) {
  heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient(heatmap) {
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

function changeRadius(heatmap) {
  heatmap.set('radius', heatmap.get('radius') ? null : 20);
}

function changeOpacity(heatmap) {
  heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
}

////////////// Sets Points to Generate Heatmap \\\\\\\\\\\\\\\
function getLatLng() {

}

function getPoints(brewLatLng) {
  console.log(brewLatLng);
  var latLngArray = []
  brewLatLng.forEach(function(location) {
    var lat = location[0];
    var lng = location[1];
    console.log(lat, lng);
    var googleLatLng = new google.maps.LatLng(lat, lng)
    console.log(googleLatLng);
    latLngArray.push(googleLatLng)
  })

  console.log(latLngArray);
  return latLngArray;

  // return  [
  //   new google.maps.LatLng(39.7335776, -104.99251249),
  //   new google.maps.LatLng(39.8335776, -104.79251249)
  // ];
}


////////Search\\\\\\\\\

function initialize() {

 var options = {
  types: ['(cities)'],
  componentRestrictions: {country: "us"}
 };

 var input = document.getElementById('searchTextField');
 var autocomplete = new google.maps.places.Autocomplete(input, options);

}
google.maps.event.addDomListener(window, 'load', initialize);

// var geocoder = new google.maps.Geocoder();
//
// function searchBar () {
//
// document.getElementById('searchBtn').addEventListener('click', function(){
//   geocodeAddress(geocoder, map);
// });
//     $("#address").keyup(function(event){
//       if(event.keyCode == 13){
//         $("#searchBtn").click();
//       }
//     });
//
// function geocodeAddress(geocoder, resultsMap) {
//        var address = document.getElementById('address').value;
//        geocoder.geocode({'address': address}, function(results, status) {
//          if (status === 'OK') {
//            resultsMap.setCenter(results[0].geometry.location);
//            var marker = new google.maps.Marker({
//              map: resultsMap,
//              position: results[0].geometry.location,
//              zoom: 13
//            });
//          } else {
//            alert('Geocode was not successful for the following reason: ' + status);
//            console.log(status);
//          }
//        })
//    }
//  }
