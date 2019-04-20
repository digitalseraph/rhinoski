import './assets/scss/styles.scss';
import { Game }  from './assets/js/game';

// Create and initiate the game object
var game = new Game();
game.init();

// Get the canvas as an HTMLCanvasElement
var gameComponent = game.canvasObj.canvas;

// Add the components to the container div
var container = document.getElementById('container');
container.appendChild(gameComponent);

// Set the  overlay to show menu
var overlay = document.getElementById('overlay');
game.userInterfaceObj.hide(overlay);



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
