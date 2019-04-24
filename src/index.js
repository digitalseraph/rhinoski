import './assets/scss/styles.scss';
import { Game }  from './assets/js/game';

// Create and initiate the game object
var game = new Game();
game.init();

var gameComponent = game.canvasObj.canvas; // Get the canvas as an HTMLCanvasElement
var container = document.getElementById('container');
var overlay = document.getElementById('overlay');

// Add the components and overlay to the container div
container.appendChild(gameComponent);



// /* Load Service Workers */
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js').then(registration => {
//       console.log('SW registered: ', registration);
//     }).catch(registrationError => {
//       console.log('SW registration failed: ', registrationError);
//     });
//   });
// }

/* Module Hot Loading */
if (module.hot) {
  module.hot.accept('./assets/js/game.js', function() {
    console.log('Accepting the updated rhinoski module!');

    document.body.removeChild(gameComponent);
    gameComponent = gameComponent; // Re-render the "component" to update changes
    document.body.appendChild(gameComponent);
  })
}
