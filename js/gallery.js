// The gallery custom element
class Gallery extends HTMLElement {
	constructor() {
		super();
		const shadowRoot = this.attachShadow({mode: 'open'});
		
		const externalStyle = document.createElement('link');
		externalStyle.setAttribute('rel', 'stylesheet');
		externalStyle.setAttribute('href', 'css/gallery.css');

		const background = document.createElement('img');
		background.setAttribute('id', 'background');
		background.setAttribute('src', 'img/bg.svg');

		const heading = document.createElement('h1');
		heading.textContent = appTitle;

		const mapContainer = document.createElement('div');
		mapContainer.setAttribute('id', 'map-container');

		MapData.regions.forEach((map, id) => {
			const preview = document.createElement('div');
			preview.onclick = () => Router.setURLMapID(id, true); // WARNING: VERY IMPORTANT

			const image = document.createElement('img');
			image.setAttribute('src', map.placeholderURL); 
			const title = document.createElement('p');
			title.textContent = map.title;

			preview.append(image, title);
			mapContainer.appendChild(preview);
		});

		shadowRoot.append(externalStyle, background, heading, mapContainer);
	}
}

// Define the gallery element
customElements.define('geo-gallery', Gallery);