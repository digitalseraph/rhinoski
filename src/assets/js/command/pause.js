import { Command } from '../command';

/**
 * Move Left Command
 */
export class PauseCommand extends Command {
  constructor(gameObj) {
    super(gameObj);
    this.gameObj = gameObj;
  }

  execute() {
    if (this.gameObj.gameStateObj.paused === false) {
      this.gameObj.gameStateObj.pause();
    } else {
      this.gameObj.gameStateObj.unpause();
    }
  }
}
