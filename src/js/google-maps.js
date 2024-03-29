{
  const mapInit = (mapDiv) => {
    const args = {
      zoom		: 14,
      center		: new google.maps.LatLng(0, 0),
      scrollwheel: false,
      navigationControl: false,
      mapTypeControl: false,
      scaleControl: false,
      draggable: false,
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
    console.log(e.target)
    if (e.target.classList.contains('toggle-coffee')) {
      markerController.activeMarkers = markerController.markers.cafes;
      mapEls.toggle.classList.remove('active');
    } else if (e.target.classList.contains('toggle-beer')) {
      markerController.activeMarkers = markerController.markers.bars;
      mapEls.toggle.classList.add('active');
    } else {
      markerController.activeMarkers = e.target.classList.contains('active') ? markerController.markers.bars : markerController.markers.cafes;
    }

    clearMarkers();
    dropMarkers();
  }

  const init = () => {
    map = mapInit(mapEls.mapDiv);

    mapEls.toggle.addEventListener('click', changeMarkers);
    mapEls.toggleCoffee.addEventListener('click', changeMarkers);
    mapEls.toggleBeer.addEventListener('click', changeMarkers);

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
    markers: markers
  }

  const mapEls = {
    mapDiv:  document.querySelector('#map ul.bg-image li.active'),
    toggle: document.querySelector('#map aside .toggle'),
    toggleCoffee: document.querySelector('#map .toggle-coffee'),
    toggleBeer: document.querySelector('#map .toggle-beer')
  }

  const now = new Date();
  const beerTimeStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 17, 30, 0);
  const beerTimeEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 4, 0, 0);

  markerController.activeMarkers = now > beerTimeStart && now < beerTimeEnd ? markerController.markers.bars : markerController.markers.cafes;
  let map = null;
  init();
}

 