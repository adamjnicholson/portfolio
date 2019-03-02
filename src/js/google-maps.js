{
  const mapInit = (mapDiv) => {
    const args = {
      zoom		: 16,
      center		: new google.maps.LatLng(0, 0),
      mapTypeId	: google.maps.MapTypeId.ROADMAP,
      styles: [{"featureType":"all","elementType":"all","stylers":[{"visibility":"simplified"},{"hue":"#bc00ff"},{"saturation":"0"}]},{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#e8b8f9"}]},{"featureType":"administrative.country","elementType":"labels","stylers":[{"color":"#ff0000"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#3e114e"},{"visibility":"simplified"}]},{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"},{"color":"#a02aca"}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"simplified"},{"color":"#2e093b"}]},{"featureType":"landscape.natural","elementType":"labels.text","stylers":[{"color":"#9e1010"},{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"labels.text.fill","stylers":[{"color":"#ff0000"}]},{"featureType":"landscape.natural.landcover","elementType":"all","stylers":[{"visibility":"simplified"},{"color":"#58176e"}]},{"featureType":"landscape.natural.landcover","elementType":"labels.text.fill","stylers":[{"visibility":"simplified"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#a02aca"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#d180ee"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#a02aca"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"},{"color":"#ff0000"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"color":"#a02aca"},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#cc81e7"},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels.text.stroke","stylers":[{"visibility":"simplified"},{"hue":"#bc00ff"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#6d2388"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#c46ce3"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#b7918f"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#280b33"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"simplified"},{"color":"#a02aca"}]}],
      disableDefaultUI: true
    };

    let map = new google.maps.Map(mapDiv, args);
    map.markers = markerController.activeMarkers.locations.map(marker => addMarker(marker, map));


    centerMap(map, markerController.markers);
    return map;
  }

  const addMarker = (mapMarker, map) => {
    const latlng = new google.maps.LatLng(mapMarker[0], mapMarker[1]);
    let args = {
      position: latlng,
      map: map,
      icon: {
        url: localize.imageDir + markerController.activeMarkers.icon,
        anchor: new google.maps.Point(20,40),
        scaledSize: new google.maps.Size(40, 40),
      }
    }

    const marker = new google.maps.Marker(args);
    return marker;
  }

  const centerMap = (map, allMarkers) => {
    let bounds = new google.maps.LatLngBounds();

    for (let key in allMarkers) {
      if (allMarkers.hasOwnProperty(key)) {
        allMarkers[key].locations.forEach(marker => bounds.extend(new google.maps.LatLng(marker[0], marker[1])))
      }
    }

    if (map.markers.length === 1) {
      map.setCenter(bounds.getCenter());
      map.setZoom(16);
    } else {
    map.fitBounds(bounds);
    }    
  }

  const clearMarkers = () => {
    map.markers.forEach(el => el.setMap(null));
    map.markers = [];
  }

  const dropMarkers = () => {
    clearMarkers();
    markerController.activeMarkers.locations.forEach((el, i) => {
      window.setTimeout(function() {
        map.markers.push(addMarker(markerController.activeMarkers.locations[i], map))
      }, i * 200);
    });
  }

  const changeMarkers = e => {
    markerController.activeMarkers = e.target.classList.contains('active') ? markerController.markers.bars : markerController.markers.cafes;
    clearMarkers();
    dropMarkers();
  }

  const init = () => {
    map = mapInit(mapDiv);

    console.log(map)

  toggle.addEventListener('click', changeMarkers);
  window.onresize = function() {
    var currCenter = map.getCenter();
    google.maps.event.trigger(map, 'resize');
    map.setCenter(currCenter);
  };
    clearMarkers();
    setTimeout(() => {
      dropMarkers();
    }, 1500)
  }
  let markerController = {
    activeMarkers: null,
    markers: {
      cafes: {
        icon: 'coffee.svg',
        locations: [
          [-27.470456, 153.023217],
          [-27.468453, 153.022865],
          [-27.467803, 153.021306],
        ]
      },
      bars: {
        icon: 'beer.svg',
        locations: [
          [-27.471737, 153.024632],
          [-27.475794, 153.021920],
          [-27.473251, 153.019007],
          [-27.473100, 153.016565]
        ]
      }
    }
  }
  markerController.activeMarkers = markerController.markers.cafes;
  

  const toggle = document.querySelector('#map aside .toggle');
  const mapDiv =  document.querySelector('#map ul.bg-image li.active');
  let map = null;
  init();
}
  
 