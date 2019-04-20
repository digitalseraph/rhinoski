
import $ from 'jquery';
import {
  MoveLeftCommand,
  MoveRightCommand,
  MoveUpCommand,
  MoveDownCommand
} from './command/move';

/**
 * InputHandler class
 */
export class InputHandler {
  constructor(gameObj) {
    this.gameObj = gameObj;

    // // Commands
    this.left   = new MoveLeftCommand(this.gameObj.skierObj);
    this.right  = new MoveRightCommand(this.gameObj.skierObj);
    this.up     = new MoveUpCommand(this.gameObj.skierObj);
    this.down   = new MoveDownCommand(this.gameObj.skierObj);

    this.handleInput = function() {
      $(window).keydown(function(event) {
        let keyCode = event.which;

        switch (keyCode) {
          case 37:
            this.left.execute();
            this.gameObj.placeNewObstacle(this.gameObj.skierObj.direction);
            event.preventDefault();
            break;
          case 39:
            this.right.execute();
            this.gameObj.placeNewObstacle(this.gameObj.skierObj.direction);
            event.preventDefault();
            break;
          case 38:
            this.up.execute();
            this.gameObj.placeNewObstacle(this.gameObj.skierObj.direction);
            event.preventDefault();
            break;
          case 40:
            this.down.execute();
            this.gameObj.placeNewObstacle(this.gameObj.skierObj.direction);
            event.preventDefault();
            break;

          default:
            throw new Error('No key mapping for key name: ' + event.which);
        }
      }.bind(this));
    }.bind(this);
  }
}
