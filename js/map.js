// Finally, the geo-map component
class Map extends HTMLElement {
	constructor() {
		super();
		const shadowRoot = this.attachShadow({mode: 'open'});
		
		const mapID = Router.getURLMapID(); // Get map id from the URL parameters

		const externalStyle = document.createElement('link');
		externalStyle.setAttribute('rel', 'stylesheet');
		externalStyle.setAttribute('href', 'css/map.css');

		const homeButton = document.createElement('img');
		homeButton.setAttribute('src', 'img/home.svg');
		homeButton.className = 'home-button';
		homeButton.onclick = () => {
			Router.clearURLParams(true);
		}

		const heading = document.createElement('h2');
		heading.textContent = MapData.regions[mapID].title;
		
		const map = document.createElement('div');
		map.setAttribute('id', 'chartdiv');
		
		shadowRoot.append(externalStyle, homeButton, heading, map);

		CreateMap(map, mapID);
	}
}

// Define the map element
customElements.define('geo-map', Map);


function CreateMap(htmlElem, mapID) {
	// Themes begin
	am4core.useTheme(am4themes_animated);
	am4core.useTheme(am4themes_material);

	let map = am4core.create(htmlElem, am4maps.MapChart);

	map.geodata = MapData.geojson.adm1; // Set map definition
	map.projection = new am4maps.projections.Miller(); // Set projection

	function renderRegion(settings) {
		let region = map.series.push(new am4maps.MapPolygonSeries());
		region.name = settings.regionTitle
		
		let geojson = settings.extended ? MapData.geojson.adm2 : MapData.geojson.adm1;
		region.geodata = geojson;
		region.useGeodata = true;
		
		region.include = [];
		geojson.features.forEach((feature) => {
			if (feature.properties.region == settings.regionID) region.include.push(feature.id);
		});
	  
		region.mapPolygons.template.tooltipText = settings.toolTipTemplate;
		region.fill = map.colors.getIndex(settings.colorIndex);
		if (settings.extended){
			region.mapPolygons.template.fill = map.colors.getIndex(settings.colorIndex).brighten(0.5);
			region.mapPolygons.template.states.create('hover').properties.fill = map.colors.getIndex(settings.colorIndex).brighten(-0.1);
		} else {
			region.mapPolygons.template.fill = map.colors.getIndex(settings.colorIndex).brighten(0.5).lighten(0.5);
			region.mapPolygons.template.states.create('hover').properties.fill = map.colors.getIndex(settings.colorIndex).lighten(0.25);
		}
	}

	MapData.regions.forEach((region, regionID) => {
		let extended = regionID == mapID;
		console.log(regionID, mapID);
		renderRegion({
			regionTitle: region.title,
			regionID: region.ID,
			extended: extended,
			toolTipTemplate: extended ? '{name}, {province}' : '{name}',
			colorIndex: [5, 4, 3, 0, 1, 2][regionID]
		});
	});
	
	// Provinces stroke
	let seriesBGStroke = map.series.push(new am4maps.MapPolygonSeries());
	seriesBGStroke.hiddenInLegend = true;
	seriesBGStroke.useGeodata = true;
	seriesBGStroke.mapPolygons.template.fillOpacity = 0;
	seriesBGStroke.mapPolygons.template.strokeWidth = 2.5;
	seriesBGStroke.mapPolygons.template.interactionsEnabled = false;

	// Legend
	map.legend = new am4maps.Legend();
	map.legend.position = "right";
	map.legend.align = "right";
	map.legend.maxWidth = screen.width / 4;
}