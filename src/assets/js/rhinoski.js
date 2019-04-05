import * as Assets from './assets.js';
import * as Obstacles from './obstacles.js';
import * as Canvas from './canvas.js'
import * as Skier from './skier.js'
import * as Game from './game.js'
import * as EventHandler from './event-handler.js'

export class RhinoSki {
    constructor() {
      this.assetsObj = new Assets.Assets({
        'skierCrash': 'assets/img/skier_crash.png',
        'skierLeft': 'assets/img/skier_left.png',
        'skierLeftDown': 'assets/img/skier_left_down.png',
        'skierDown': 'assets/img/skier_down.png',
        'skierRightDown': 'assets/img/skier_right_down.png',
        'skierRight': 'assets/img/skier_right.png',
        'tree': 'assets/img/tree_1.png',
        'treeCluster': 'assets/img/tree_cluster.png',
        'rock1': 'assets/img/rock_1.png',
        'rock2': 'assets/img/rock_2.png'
      });
      this.obstaclesObj = new Obstacles.Obstacles();
      this.canvasObj = new Canvas.Canvas();
      this.canvasObj.init()
      this.skierObj = new Skier.Skier();
      this.gameObj = new Game.Game(
        this.assetsObj,
        this.obstaclesObj,
        this.canvasObj,
        this.skierObj
      );
      this.eventHandlerObj = new EventHandler.EventHandler(this.gameObj);
      this.loop = function() {
        this.canvasObj.ctx.save();
        // Retina support
        this.canvasObj.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        this.canvasObj.clearCanvas(this.canvasObj.ctx);
        this.gameObj.moveSkier();
        this.gameObj.checkIfSkierHitObstacle();
        this.gameObj.drawSkier();
        this.gameObj.drawObstacles();
        this.canvasObj.ctx.restore();
        requestAnimationFrame(this.loop);
      }.bind(this);

      this.init = function() {
        this.eventHandlerObj.setupKeyhandler();
        this.assetsObj.load().then(function() {
          this.gameObj.placeInitialObstacles();
          requestAnimationFrame(this.loop);
        }.bind(this));
      };
    }
}
