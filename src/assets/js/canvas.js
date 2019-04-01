import * as $ from 'jquery';

export class Canvas {
  constructor(gameWidth = window.innerWidth, gameHeight = window.innerHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    // this.canvas = $('<canvas></canvas>')
    //   .attr('width', this.gameWidth * window.devicePixelRatio)
    //   .attr('height', this.gameHeight * window.devicePixelRatio)
    //   .css({
    //     width: this.gameWidth + 'px',
    //     height: this.gameHeight + 'px'
    //   });
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.gameWidth * window.devicePixelRatio;
    this.canvas.height = this.gameHeight * window.devicePixelRatio;
    this.canvas.style.width = this.gameWidth + 'px';
    this.canvas.style.height = this.gameHeight + 'px';

    this.ctx = null;
    this.addCanvas = function() {
      $('body').append(this.canvas);
    };
    this.getContext = function() {
      return this.canvas.getContext('2d');
    };
    this.clearCanvas = function(ctx) {
      this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
    };
    this.init = function() {
      this.addCanvas();
      this.ctx = this.getContext();
    };
  }
}

