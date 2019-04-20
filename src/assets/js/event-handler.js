import $ from 'jquery';

export class EventHandler {
  constructor(gameObj) {
    this.gameObj = gameObj;
    this.skierObj = gameObj.skierObj


    this.setupKeyhandler = function() {
      $(window).keydown(function(event) {
        switch (event.which) {
          case 37: // left arrow
            this.keypress.left();
            event.preventDefault();
            break;
          case 39: // right arrow
            this.keypress.right();
            event.preventDefault();
            break;
          case 38: // up arrow
            this.keypress.up();
            event.preventDefault();
            break;
          case 40: // down arrow
            this.keypress.down();
            event.preventDefault();
            break;
          default:
            break;
        }
      }.bind(this));
    };

    this.keypress = {
      left: function() {
        this.skierObj.x -= this.skierObj.speed;
        switch (this.skierObj.direction) {
          case 0: // crash
            this.skierObj.direction++;
            this.gameObj.placeNewObstacle(this.skierObj.direction);
            break;
          case 1: // left
            this.gameObj.placeNewObstacle(this.skierObj.direction);
            break;
          case 2: // left-down
            this.gameObj.placeNewObstacle(this.skierObj.direction);
            this.skierObj.direction--;
            break;
          case 5: // right
            this.skierObj.direction = 1;
            this.gameObj.placeNewObstacle(this.skierObj.direction);
            break;
          default:
            this.skierObj.direction = 2;
            this.gameObj.placeNewObstacle(this.skierObj.direction);
        }
      }.bind(this),
      right: function() {
        this.skierObj.x += this.skierObj.speed;
        switch (this.skierObj.direction) {
          case 0: // crash
            this.skierObj.direction = 5;
            this.gameObj.placeNewObstacle(this.skierObj.direction);
            break;
          case 1: // left
            this.skierObj.direction = 5;
            this.gameObj.placeNewObstacle(this.skierObj.direction);
            break;
          case 3: // down
            this.skierObj.direction++;
            this.gameObj.placeNewObstacle(this.skierObj.direction);
            break;
          case 4: // right-down
            this.skierObj.direction++;
            this.gameObj.placeNewObstacle(this.skierObj.direction);
            break;
          case 5: // right
            this.gameObj.placeNewObstacle(this.skierObj.direction);
            break;
          default:
            this.skierObj.direction = 4;
            break;
        }
      }.bind(this),
      up: function() {
        this.skierObj.y -= this.skierObj.speed;
        this.gameObj.placeNewObstacle(6);
        switch (this.skierObj.direction) {
          case 1:
            break;
          case 2:
            this.skierObj.direction--;
            break;
          default:
            this.skierObj.direction = 5;
            break;
        }
      }.bind(this),
      down: function() {
        this.skierObj.direction = 3;
      }.bind(this)
    };

    // this.leftArrowKeyPress = function() {
    //   this.skierObj.x -= this.skierObj.speed;
    //   switch (this.skierObj.direction) {
    //     case 0: // crash
    //       this.skierObj.direction++;
    //       this.gameObj.placeNewObstacle(this.skierObj.direction);
    //       break;
    //     case 1: // left
    //       this.gameObj.placeNewObstacle(this.skierObj.direction);
    //       break;
    //     case 2: // left-down
    //       this.gameObj.placeNewObstacle(this.skierObj.direction);
    //       this.skierObj.direction--;
    //       break;
    //     case 5: // right
    //       this.skierObj.direction = 1;
    //       this.gameObj.placeNewObstacle(this.skierObj.direction);
    //       break;
    //     default:
    //       this.skierObj.direction = 2;
    //       this.gameObj.placeNewObstacle(this.skierObj.direction);
    //   }
    // };
    // this.rightArrowKeyPress = function() {
    //   this.skierObj.x += this.skierObj.speed;
    //   switch (this.skierObj.direction) {
    //     case 0: // crash
    //       this.skierObj.direction = 5;
    //       this.gameObj.placeNewObstacle(this.skierObj.direction);
    //       break;
    //     case 1: // left
    //       this.skierObj.direction = 5;
    //       this.gameObj.placeNewObstacle(this.skierObj.direction);
    //       break;
    //     case 3: // down
    //       this.skierObj.direction++;
    //       this.gameObj.placeNewObstacle(this.skierObj.direction);
    //       break;
    //     case 4: // right-down
    //       this.skierObj.direction++;
    //       this.gameObj.placeNewObstacle(this.skierObj.direction);
    //       break;
    //     case 5: // right
    //       this.gameObj.placeNewObstacle(this.skierObj.direction);
    //       break;
    //     default:
    //       this.skierObj.direction = 4;
    //       break;
    //   }
    // };
    // this.upArrowKeyPress = function() {
    //   this.skierObj.y -= this.skierObj.speed;
    //   this.gameObj.placeNewObstacle(6);
    //   switch (this.skierObj.direction) {
    //     case 1:
    //       break;
    //     case 2:
    //       this.skierObj.direction--;
    //       break;
    //     default:
    //       this.skierObj.direction = 5;
    //       break;
    //   }
    // };
    // this.downArrowKeyPress = function() {
    //   this.skierObj.direction = 3;
    // };
    // this.setupKeyhandler = function() {
    //   $(window).keydown(function(event) {
    //     switch (event.which) {
    //       case 37: // left arrow
    //         this.leftArrowKeyPress();
    //         event.preventDefault();
    //         break;
    //       case 39: // right arrow
    //         this.rightArrowKeyPress();
    //         event.preventDefault();
    //         break;
    //       case 38: // up arrow
    //         this.upArrowKeyPress();
    //         event.preventDefault();
    //         break;
    //       case 40: // down arrow
    //         this.downArrowKeyPress();
    //         event.preventDefault();
    //         break;
    //     }
    //   }.bind(this));
    // };
  }
}
