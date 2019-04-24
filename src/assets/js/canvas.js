import * as $ from 'jquery';

export class Canvas {
  constructor(gameWidth = window.innerWidth, gameHeight = window.innerHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.gameWidth * window.devicePixelRatio;
    this.canvas.height = this.gameHeight * window.devicePixelRatio;
    this.canvas.style.width = this.gameWidth + 'px';
    this.canvas.style.height = this.gameHeight + 'px';

    this.ctx = null

    this.clearCanvas = function(ctx) {
      this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
    }

    this.getContext = function() {
      return this.canvas.getContext('2d');
    }

    this.init = function() {
      this.addCanvas();
      this.ctx = this.getContext();
    }
    this.init();
  }

}

Canvas.prototype.addCanvas = function() {
  $('body').append(this.canvas);
}

Canvas.prototype.getContext = function() {
  this.ctx = this.canvas.getContext('2d');
  return this.ctx;
}
