import './assets/scss/styles.scss';
import * as RhinoSki from './assets/js/rhinoski';

/**
 * Create html component
 *
 * @returns HTMLCanvasElement
 */
function component() {
  var rhinoSkiObj = new RhinoSki.RhinoSki();
  rhinoSkiObj.init();
  return rhinoSkiObj.canvasObj.canvas;
}

/* Create our Rhino Ski game component and add to the webpage */
let element = component();
document.body.appendChild(element);

/* Load Service Workers */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}

/* Module Hot Loading */
if (module.hot) {
  module.hot.accept('./assets/js/rhinoski.js', function() {
    console.log('Accepting the updated rhinoski module!');

    document.body.removeChild(element);
    element = component(); // Re-render the "component" to update changes
    document.body.appendChild(element);
  })
}
