// Global variables
const mapsCount = 6;

const appTitle = 'Райони за планиране в България';

// Very simple URL navigation methods
const Router = {};

Router.getURLMapID = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = parseInt(urlParams.get('map')) - 1;
    return (id >= 0 && id < mapsCount) ? id : undefined;
}

Router.setURL = (url, reload=false) => {
    if (reload) window.location.href = url;
    else window.history.replaceState(null, null, url);
}

Router.setURLMapID = (mapID, reload=false) => {
    Router.setURL(window.location.pathname + '?map=' + (mapID + 1), reload);
}

Router.clearURLParams = (reload=false) => {
    Router.setURL(window.location.pathname, reload);
}

// Prevent flashes of unstyled content
setTimeout(() => {
    document.body.style.opacity = 1;
}, 150);