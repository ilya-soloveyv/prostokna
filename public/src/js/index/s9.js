function initMap() {

	var lat = 55.7067838;
	var lng = 37.6888278;

	var zoom = 17;
	var window_width = $(window).width();
	if (window_width <= 576) {
		var lat = 55.7760;
		var lng = 37.680;
		var zoom = 15;
	}
	if (window_width <= 350) {
		var lat = 55.7765;
		var lng = 37.680;
		var zoom = 14;
	}

    // Styles a map in night mode.
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: lat, lng: lng },
      zoom: zoom,
      styles: [
		  {
		    "elementType": "geometry",
		    "stylers": [
		      {
						"color": "#f5f5f5",
						// "saturation": -1000
		      }
				],
				// "lightness": -15
		  },
		  {
		    "elementType": "labels.icon",
		    "stylers": [
		      {
		        "visibility": "off"
		      }
		    ]
		  },
		  {
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
						"color": "#616161"
						// "color": "#CC0000"
		      }
		    ]
		  },
		  {
		    "elementType": "labels.text.stroke",
		    "stylers": [
		      {
						"color": "#f5f5f5"
						// "color": "#CC0000"
		      }
		    ]
		  },
		  {
		    "featureType": "administrative",
		    "elementType": "geometry",
		    "stylers": [
		      {
						"visibility": "on",
						// "color": "#CC0000"

		      }
		    ]
		  },
		  {
		    "featureType": "administrative.land_parcel",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
						"color": "#bdbdbd"
						// "color": "#CC0000",
		      }
		    ]
			},
		  {
		    "featureType": "landscape.man_made",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
						"color": "#CC0000"
						// "color": "#CC0000",
		      }
		    ]
			},
		  {
		    "featureType": "poi",
		    "stylers": [
		      {
		        "visibility": "off"
		      }
		    ]
		  },
		  // {
		  //   "featureType": "landscape.man_made",
		  //   "elementType": "geometry",
		  //   "stylers": [
		  //     {
			// 			// "color": "#eeeeee"
			// 			"color": "#CC0000"
		  //     }
		  //   ]
		  // },
		  {
		    "featureType": "poi",
		    "elementType": "geometry",
		    "stylers": [
		      {
						// "color": "#eeeeee"
						"color": "#CC0000"
		      }
		    ]
		  },
		  {
		    "featureType": "poi",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#757575"
		      }
		    ]
		  },
		  {
		    "featureType": "poi.park",
		    "elementType": "geometry",
		    "stylers": [
		      {
						// "color": "#e5e5e5"
						"color": "#CC0000"
		      }
		    ]
		  },
		  {
		    "featureType": "poi.park",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#9e9e9e"
		      }
		    ]
		  },
		  {
		    "featureType": "road",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#ffffff"
		      }
		    ]
		  },
		  {
		    "featureType": "road",
		    "elementType": "labels.icon",
		    "stylers": [
		      {
		        "visibility": "off"
		      }
		    ]
		  },
		  {
		    "featureType": "road.arterial",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#757575"
		      }
		    ]
		  },
		  {
		    "featureType": "road.highway",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#dadada"
		      }
		    ]
		  },
		  {
		    "featureType": "road.highway",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#616161"
		      }
		    ]
		  },
		  {
		    "featureType": "road.local",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#9e9e9e"
		      }
		    ]
		  },
		  {
		    "featureType": "transit",
		    "stylers": [
		      {
		        "visibility": "off"
		      }
		    ]
		  },
		  {
		    "featureType": "transit.line",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#e5e5e5"
		      }
		    ]
		  },
		  {
		    "featureType": "transit.station",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#eeeeee"
		      }
		    ]
		  },
		  {
		    "featureType": "water",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#c9c9c9"
		      }
		    ]
		  },
		  {
		    "featureType": "water",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#9e9e9e"
		      }
		    ]
		  }
		]
    });

  

// var flightPlanCoordinates = [
//     {lat: 55.77833708, lng: 37.67620694},
//     {lat: 55.77729924, lng: 37.67922711}
//   ];
//   var flightPath = new google.maps.Polyline({
//     path: flightPlanCoordinates,
//     geodesic: true,
//     strokeColor: '#00c277',б
//     strokeOpacity: 1.0,
//     strokeWeight: 3,
//     icons: [{
//     //   icon: lineSymbol,
//       offset: '0',
//       repeat: '20px'
//     }]
//   });

//   flightPath.setMap(map);


    var image = '/images/index/s9/Placeholder_dark_grey.png';
    var beachMarker = new google.maps.Marker({
				// position: {lat: 55.77688822, lng: 37.67967431},
				position: {lat: 55.70784412551903, lng: 37.68859863281251},				
        map: map,
        icon: image
		});
		beachMarker.addListener('click', function() {
			$('#fullpage_welcome .section.s9 .full .r ul.info').addClass('open')
			// map.setZoom(8);
			// map.setCenter(marker.getPosition());
		});

    var image = '/images/index/s9/Parking_green.png';
    var beachMarker = new google.maps.Marker({
			// position: {lat: 55.7778778, lng: 37.67761437},
				// position: {lat: 55.7062838, lng: 37.6848278},
				// 55.7070788,37.6865524
				// 55.7062838,37.6848278
        map: map,
        icon: image
    });

    var beachMarker = new google.maps.Marker({
        position: {lat: 55.77501158, lng: 37.6835796},
        map: map,
        icon: image
    });

    var image = '/images/index/s9/Underground_grey.png';
    var beachMarker = new google.maps.Marker({
				position: {lat: 55.7062038, lng: 37.6848278},
				// position: {lat: 55.77244769, lng: 37.67911909},
        map: map,
        icon: image
    });
    
    var lineSymbol = {
        path: 'M 0,-1 0,1',
        strokeOpacity: 1,
        scale: 2
    };
    var line_subway = [

			{lat: 55.7062838, lng: 37.6848278},
			{lat: 55.706348, lng: 37.686384},
			{lat: 55.706397, lng: 37.687535},
			{lat: 55.706526, lng: 37.687610},
			{lat: 55.706652, lng: 37.687851},
			{lat: 55.707161, lng: 37.688701},
			{lat: 55.707216, lng: 37.688758},
			{lat: 55.707320, lng: 37.688648},
			{lat: 55.707453, lng: 37.688717},
			{lat: 55.707453, lng: 37.688717},
			{lat: 55.70784412551903, lng: 37.68859863281251},
				// {lat: 55.77629752, lng: 37.68117861},
				// {lat: 55.77595961, lng: 37.68032567},
				// {lat: 55.77572126, lng: 37.68052415},
				// {lat: 55.77493076, lng: 37.67795996},
				// {lat: 55.77244602, lng: 37.67861978},
    ];
    var line = new google.maps.Polyline({
        path: line_subway,
        strokeOpacity: 0,
        icons: [{
            icon: lineSymbol,
            offset: '0',
            repeat: '10px'
        }],
        map: map
    });    




				var flightPlanCoordinates = [
					{lat: 55.77827, lng: 37.67624395},
					{lat: 55.777191, lng: 37.6793}
        ];
        var flightPath = new google.maps.Polyline({
          path: flightPlanCoordinates,
          geodesic: true,
          strokeColor: '#00B800',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });

				flightPath.setMap(map);



				var flightPlanCoordinates = [
				{lat: 55.77530839, lng: 37.68359504},
				{lat: 55.77492747, lng: 37.68413416},
				{lat: 55.77469666, lng: 37.68361918},
				{lat: 55.77473211, lng: 37.68345288},
				{lat: 55.77484299, lng: 37.68322221},
				{lat: 55.77503307, lng: 37.68294192},
				{lat: 55.77530839, lng: 37.68359504},
        ];
        var flightPath = new google.maps.Polyline({
          path: flightPlanCoordinates,
          geodesic: true,
          strokeColor: '#00B800',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });

				flightPath.setMap(map);
				
				



  }

  // var myLatlng = new google.maps.LatLng(55.7768451,37.6787144);
  // var marker = new google.maps.Marker({
  	// position: myLatlng,
  	// title:"Hello World!"
  // });
	// marker.setMap(map);
	if ($('#map').length) {
		var script = document.createElement('script');
		script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCt8zCnAdWM57-hf6vndvzWZ0UKDPc2yxE&callback=initMap";  
		document.body.appendChild(script);
	}
	
	$('#fullpage_welcome .section.s9 .full .r ul.info .closeMore').click(function(){
		$('#fullpage_welcome .section.s9 .full .r ul.info').removeClass('open')
	})