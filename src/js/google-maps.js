const mapInit = (mapDiv, cafes) => {
  const args = {
		zoom		: 16,
		center		: new google.maps.LatLng(0, 0),
		mapTypeId	: google.maps.MapTypeId.ROADMAP
	};

  let map = new google.maps.Map(mapDiv, args);
  map.markers = cafes.map(marker => addMarker(marker, map));

  centerMap(map);

  return map;
}

const addMarker = (mapMarker, map) => {
  const latlng = new google.maps.LatLng(mapMarker[0], mapMarker[1]);
  const marker = new google.maps.Marker({
    position: latlng,
    map: map
  });

  return marker;
}

const centerMap = map => {
  let bounds = new google.maps.LatLngBounds();
  map.markers.forEach(marker => {
    bounds.extend(setBounds(marker));
  }); 

  if (map.markers.length === 1) {
    map.setCenter(bounds.getCenter());
    map.setZoom(16);
  } else {
    map.fitBounds(bounds);
  }
}

const setBounds = marker => {
  return new google.maps.LatLng( marker.position.lat(), marker.position.lng() );
}



const cafes = [
  [-27.477771, 152.993420],
  [-27.470801, 153.004949],
  [-27.471075, 153.024320]
];
const mapDiv =  document.querySelector('#map ul.bg-image li.active');
 
const map = mapInit(mapDiv,cafes);
  
 