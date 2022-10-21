class MarcelPluginVcub extends Marcel.Plugin {

  constructor() {
    super()
    this.root = document.getElementById('root')
    this.map = document.getElementById('map')
    this.dataBordeauxUrl='https://data.bordeaux-metropole.fr/geojson?key={{key}}&typename=ci_vcub_p'
    //this.mapView = this.initMapView()
  }

  initMapView() {
    var mapView = L.map('map').setView([44.886937, -0.56695972], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapView);

    var circle = L.circle([44.886937, -0.56695972], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(mapView);
    circle.bindPopup("Je suis à Bdx.io 😎");

    return mapView
  }

  getData(apiKey) {
    return fetch(this.dataBordeauxUrl.replace('{{key}}', apiKey))
        .then(response => response.json())
  }

  propsDidChange() {
      const { apiKey } = this.props
      this.getData(apiKey).then(data => {
          console.log(data)
          let mapView = this.initMapView()
          data.features.map(feat => {
              let coord = feat.geometry.coordinates
              L.marker([coord[1], coord[0]]).addTo(mapView);
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
