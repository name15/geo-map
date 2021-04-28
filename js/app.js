// The entry point of the application
class App extends HTMLElement {
	constructor() {
		super();
		const shadowRoot = this.attachShadow({mode: 'open'});

		let elem;
		const mapID = Router.getURLMapID(); // Get map id from the URL parameters
		
		if (!isNaN(mapID)) { // If map ID is supplied, show the corresponding map.
			elem = document.createElement('geo-map');
			elem.setAttribute('map-id', mapID);
			Router.setURLMapID(mapID);

			document.title = MapData.regions[mapID].title;
		} else { // Otherwise show a gallery of the available maps.
			elem = document.createElement('geo-gallery');
			Router.clearURLParams(); // And clear the unnecessary url parameters

			document.title = appTitle;
		}

		shadowRoot.appendChild(elem);
	}
}

// Define the geo-map element
customElements.define('geo-app', App);