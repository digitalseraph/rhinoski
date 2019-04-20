import $ from 'jquery';
import _ from 'lodash';
import { Assets } from './assets.js';
import { Obstacles } from './obstacles.js';
import { Canvas } from './canvas.js'
import { Skier } from './skier.js'
import { EventHandler } from './event-handler.js'
import { InputHandler } from './input-handler.js'
import { UserInterface } from './user-interface.js';

export class Game {
  constructor() {
    this.assetsObj = new Assets({
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
    this.obstaclesObj = new Obstacles();
    this.canvasObj = new Canvas();
    this.skierObj = new Skier();
    // this.eventHandlerObj = new EventHandler(this);
    this.inputHandlerObj = new InputHandler(this);
    this.userInterfaceObj = new UserInterface();

    this.calculateOpenPosition = function(minX, maxX, minY, maxY) {
      let x = _.random(minX, maxX);
      let y = _.random(minY, maxY);
      let foundCollision = _.find(this.obstaclesObj.obstacles, function(obstacle) {
        return x > (obstacle.x - 50) && x < (obstacle.x + 50) && y > (obstacle.y - 50) && y < (obstacle.y + 50);
      });
      if (foundCollision) {
        return this.calculateOpenPosition(minX, maxX, minY, maxY);
      } else {
        return {
          x: x,
          y: y
        };
      }
    };

    this.placeRandomObstacle = function(minX, maxX, minY, maxY) {
      let obstacleIndex = _.random(0, this.obstaclesObj.obstacleTypes.length - 1);
      let position = this.calculateOpenPosition(minX, maxX, minY, maxY);
      this.obstaclesObj.obstacles.push({
        type: this.obstaclesObj.obstacleTypes[obstacleIndex],
        x: position.x,
        y: position.y
      });
    };

    this.placeNewObstacle = function(direction) {
      let shouldPlaceObstacle = _.random(1, 8);
      if (shouldPlaceObstacle !== 8) {
        return;
      }
      let leftEdge = this.skierObj.x;
      let rightEdge = this.skierObj.x + this.canvasObj.gameWidth;
      let topEdge = this.skierObj.y;
      let bottomEdge = this.skierObj.y + this.canvasObj.gameHeight;
      switch (direction) {
        case 1: // left
          this.placeRandomObstacle(leftEdge - 50, leftEdge, topEdge, bottomEdge);
          break;
        case 2: // left down
          this.placeRandomObstacle(leftEdge - 50, leftEdge, topEdge, bottomEdge);
          this.placeRandomObstacle(leftEdge, rightEdge, bottomEdge, bottomEdge + 50);
          break;
        case 3: // down
          this.placeRandomObstacle(leftEdge, rightEdge, bottomEdge, bottomEdge + 50);
          break;
        case 4: // right down
          this.placeRandomObstacle(rightEdge, rightEdge + 50, topEdge, bottomEdge);
          this.placeRandomObstacle(leftEdge, rightEdge, bottomEdge, bottomEdge + 50);
          break;
        case 5: // right
          this.placeRandomObstacle(rightEdge, rightEdge + 50, topEdge, bottomEdge);
          break;
        case 6: // up
          this.placeRandomObstacle(leftEdge, rightEdge, topEdge - 50, topEdge);
          break;
        default:
          break;
      }
    };

    this.moveSkier = function() {
      switch (this.skierObj.direction) {
        case 2:
          this.skierObj.x -= Math.round(this.skierObj.speed / 1.4142);
          this.skierObj.y += Math.round(this.skierObj.speed / 1.4142);
          this.placeNewObstacle(this.skierObj.direction);
          break;
        case 3:
          this.skierObj.y += this.skierObj.speed;
          this.placeNewObstacle(this.skierObj.direction);
          break;
        case 4:
          this.skierObj.x += this.skierObj.speed / 1.4142;
          this.skierObj.y += this.skierObj.speed / 1.4142;
          this.placeNewObstacle(this.skierObj.direction);
          break;
        default:
          break;
      }
    };
    this.drawSkier = function() {
      let skierAssetName = this.skierObj.getSkierAsset();
      let skierImage = this.assetsObj.loaded[skierAssetName];
      let x = (this.canvasObj.gameWidth - skierImage.width) / 2;
      let y = (this.canvasObj.gameHeight - skierImage.height) / 2;
      this.canvasObj.ctx.drawImage(skierImage, x, y, skierImage.width, skierImage.height);
    };
    this.drawObstacles = function() {
      let newObstacles = [];
      _.each(this.obstaclesObj.obstacles, function(obstacle) {
        let obstacleImage = this.assetsObj.loaded[obstacle.type];
        let x = obstacle.x - this.skierObj.x - obstacleImage.width / 2;
        let y = obstacle.y - this.skierObj.y - obstacleImage.height / 2;
        if (x < -100 || x > this.canvasObj.gameWidth + 50 || y < -100 || y > this.canvasObj.gameHeight + 50) {
          return;
        }
        this.canvasObj.ctx.drawImage(obstacleImage, x, y, obstacleImage.width, obstacleImage.height);
        newObstacles.push(obstacle);
      }.bind(this));
      this.obstaclesObj.obstacles = newObstacles;
    };
    this.intersectRect = function(r1, r2) {
      return !(r2.left > r1.right ||
        r2.right < r1.left ||
        r2.top > r1.bottom ||
        r2.bottom < r1.top);
    };
    this.checkIfSkierHitObstacle = function() {
      let skierAssetName = this.skierObj.getSkierAsset();
      let skierImage = this.assetsObj.loaded[skierAssetName];
      let skierRect = {
        left: this.skierObj.x + this.canvasObj.gameWidth / 2,
        right: this.skierObj.x + skierImage.width + this.canvasObj.gameWidth / 2,
        top: this.skierObj.y + skierImage.height - 5 + this.canvasObj.gameHeight / 2,
        bottom: this.skierObj.y + skierImage.height + this.canvasObj.gameHeight / 2
      };
      let collision = _.find(this.obstaclesObj.obstacles, function(obstacle) {
        let obstacleImage = this.assetsObj.loaded[obstacle.type];
        let obstacleRect = {
          left: obstacle.x,
          right: obstacle.x + obstacleImage.width,
          top: obstacle.y + obstacleImage.height - 5,
          bottom: obstacle.y + obstacleImage.height
        };
        let intersectRect = function (r1, r2) {
          return !(r2.left > r1.right ||
            r2.right < r1.left ||
            r2.top > r1.bottom ||
            r2.bottom < r1.top);
        };
        return intersectRect(skierRect, obstacleRect);
      }.bind(this));
      if (collision) {
        this.skierObj.direction = 0;
      }
    };
    this.placeInitialObstacles = function() {
      let numberObstacles = Math.ceil(_.random(5, 7) * (this.canvasObj.gameWidth / 800) * (this.canvasObj.gameHeight / 500));
      let minX = -50;
      let maxX = this.canvasObj.gameWidth + 50;
      let minY = this.canvasObj.gameHeight / 2 + 100;
      let maxY = this.canvasObj.gameHeight + 50;
      let i = 0;
      for (i = 0; i < numberObstacles; i++) {
        this.placeRandomObstacle(minX, maxX, minY, maxY);
      }
      this.obstaclesObj.obstacles = _.sortBy(this.obstaclesObj.obstacles, function(obstacle) {
        let obstacleImage = this.assetsObj.loaded[obstacle.type];
        return obstacle.y + obstacleImage.height;
      }.bind(this));
    };

    this.loop = function() {
      this.canvasObj.ctx.save();
      this.canvasObj.ctx.scale(window.devicePixelRatio, window.devicePixelRatio); // Retina support
      this.canvasObj.clearCanvas(this.canvasObj.ctx);
      this.moveSkier();
      this.checkIfSkierHitObstacle();
      this.drawSkier();
      this.drawObstacles();
      this.canvasObj.ctx.restore();
      requestAnimationFrame(this.loop);
    }.bind(this)

    this.init = function() {
      this.inputHandlerObj.handleInput();
      this.assetsObj.load().then(function() {
        this.placeInitialObstacles();
        requestAnimationFrame(this.loop);
      }.bind(this));
    }
  }
}

