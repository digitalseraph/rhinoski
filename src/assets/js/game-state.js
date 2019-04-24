export class GameState {
  constructor(gameObj) {
    this.gameObj = gameObj;
    this.direction = this.gameObj.skierObj.direction;
    this.savedDirection = this.direction;
    this.distance = 0;
    this.speed = 1.4142;
    this.savedSpeed = this.speed;
    this.skierSpeed = this.gameObj.skierObj.speed;
    this.savedSkierSpeed = this.skierSpeed;
    this.playerScore = 0;
    this.playerInitials = 'AAA';
    this.paused = false;

    this.updatePlayerScore = function() {
      this.playerScore = Math.floor((this.distance * this.speed) / 10);
    }

    this.increaseGameSpeed = function() {
      this.speed += 0.1;
    }

    this.decreaseGameSpeed = function() {
      this.speed -= - 0.1;
    }

    this.pause = function() {
      this.paused = true;
    }

    this.unpause = function() {
      this.paused = false;
    }

    this.reset = function() {
      this.gameObj.skierObj.direction = this.direction = 0;
      this.distance = 0;
      this.speed = 1.4142;
      this.skierSpeed = this.gameObj.skierObj.speed = 0;
      this.playerScore = 0;
      this.playerInitials = 'AAA';
    }
  }

}
