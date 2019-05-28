
import $ from 'jquery';
import {
  MoveLeftCommand,
  MoveRightCommand,
  MoveUpCommand,
  MoveDownCommand
} from './command/move';
import { PauseCommand } from './command/pause';
import { JumpCommand } from './command/jump';

/**
 * InputHandler class
 */
export class InputHandler {
  constructor(gameObj) {
    this.gameObj = gameObj;

    // // Commands
    this.left = new MoveLeftCommand(this.gameObj.skierObj);
    this.right = new MoveRightCommand(this.gameObj.skierObj);
    this.up = new MoveUpCommand(this.gameObj.skierObj);
    this.down = new MoveDownCommand(this.gameObj.skierObj);
    this.p = new PauseCommand(this.gameObj);
    this.space = new JumpCommand(this.gameObj.skierObj);

    this.handleInput = function() {
      $(window).keydown(function(event) {
        let keyCode = event.which;

        if (this.gameObj.gameStateObj.paused === true) {
          switch (keyCode) {
            case 80:
              this.p.execute();
              event.preventDefault();
              break;
            default:
              throw new Error('Game is paused! Press "p" to unpause.');
          }
        } else {
          switch (keyCode) {
            case 37:
              this.left.execute();
              this.gameObj.placeNewObstacle(this.gameObj.skierObj.direction);
              event.preventDefault();
              break;
            case 32:
              this.space.execute();
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
            case 80:
              this.p.execute();
              event.preventDefault();
              break;

            default:
              throw new Error('No key mapping for key name: ' + event.which);
          }
        }

      }.bind(this));
    }.bind(this);
  }
}
