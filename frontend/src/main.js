class MarcelPluginVcub extends Marcel.Plugin {

  constructor() {
    super()
    this.root = document.getElementById('root')
    this.map = document.getElementById('map')
    this.dataBordeauxUrl='https://data.bordeaux-metropole.fr/geojson?key={{key}}&typename=ci_vcub_p'
    //this.mapView = this.initMapView()
  }

  // http://tile.stamen.com/watercolor/{z}/{x}/{y}.png
  // http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png
  // https://tile.openstreetmap.org/{z}/{x}/{y}.png
  // https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png
  // https://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=51f85a703deb42e8b08f851691bdc63a



  initMapView() {
    var mapView = L.map('map').setView([44.886937, -0.56695972], 14);
    L.tileLayer('https://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=51f85a703deb42e8b08f851691bdc63a', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapView);

    var circle = L.circle([44.88797, -0.567169], {
        color: '#EE2238',
        fillColor: '#EE2238',
        fillOpacity: 0.5,
        radius: 130
    }).addTo(mapView);
    circle.bindPopup("Je suis à Bdx.io 😎").openPopup();

    return mapView
  }

  getData(apiKey) {
    return fetch(this.dataBordeauxUrl.replace('{{key}}', apiKey))
        .then(response => response.json())
  }

  propsDidChange() {
      const { apiKey } = this.props
      this.getData(apiKey).then(data => {
          // console.log(data)
          let mapView = this.initMapView()
          data.features.map(feat => {
              let coord = feat.geometry.coordinates;
              let properties = feat.properties;

              var popupText = `<strong>Station :</strong> ${properties.nom}<br>🔋 <strong>Vélos électriques : </strong>${properties.nbelec}<br> 🚴‍♀️ <strong>Vélos classiques : </strong>${properties.nbclassiq} <br> 🅿️ <strong>Places : </strong>${properties.nbplaces}`;

              // specify popup options 
              var customOptions = {'className' : 'popupCustom'}

              var bikeMarker = L.AwesomeMarkers.icon({
                prefix: 'bi',
                icon: 'bicycle',
                iconColor: 'white',
                markerColor: 'purple'
              });

              var marker = L.marker([coord[1], coord[0]], {icon: bikeMarker}).addTo(mapView);
              marker.bindPopup(popupText,customOptions); 
          })
      })
  }

  render() {
    const { apiKey, stylesvar = {} } = this.props

    // stylesvar is a special property containing the global media theme.
    // You should use it to have a consistent style accross all the media.
    if (stylesvar['primary-color']) this.root.style.color = stylesvar['primary-color']
    if (stylesvar['font-family']) this.root.style.fontFamily = stylesvar['font-family']
  }
}

Marcel.init(MarcelPluginVcub)

// uncomment this line to try the plugin in a browser :
Marcel.changeProps({ apiKey: '334BCKOWWZ' })
