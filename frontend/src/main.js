class MarcelPluginVcub extends Marcel.Plugin {

  constructor() {
    super()
    this.root = document.getElementById('root')
    this.dataBordeauxUrl='https://data.bordeaux-metropole.fr/geojson?key={{key}}&typename=ci_vcub_p'
  }

  getData(apiKey) {
    return fetch(this.dataBordeauxUrl.replace('{{key}}', apiKey))
        .then(response => response.json())
  }

  propsDidChange() {
      const { apiKey } = this.props
      this.getData(apiKey).then(data => {
          this.root.innerText = data.type
      })
  }

  render() {
    const { apiKey, stylesvar = {} } = this.props

    this.root.innerText = `Loading...`

    // stylesvar is a special property containing the global media theme.
    // You should use it to have a consistent style accross all the media.
    if (stylesvar['primary-color']) this.root.style.color = stylesvar['primary-color']
    if (stylesvar['font-family']) this.root.style.fontFamily = stylesvar['font-family']
  }
}

Marcel.init(MarcelPluginVcub)

// uncomment this line to try the plugin in a browser :
// Marcel.changeProps({ apiKey: '...' })
