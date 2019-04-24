
export class UserInterface {
  constructor(gameStateObj) {
    this.gameStateObj = gameStateObj;

    this.container = document.getElementById('container');
    this.overlay = document.getElementById('overlay');
    this.introOverlay = document.getElementById('intro-overlay');
    this.runningOverlay = document.getElementById('running-overlay');

    this.startBtn = document.getElementById('startBtn');
    this.pauseBtn = document.getElementById('pauseBtn');

    this.distanceTraveled = document.getElementById('distance-traveled');
    this.currentScoreValue = document.getElementById('current-score');
    this.highScore = document.getElementById('current-score');

    this.hide(this.runningOverlay);
    this.hide(this.runningOverlay);

    this.startBtn.onclick = function(event) {
      this.hide(this.overlay)
      this.hide(this.introOverlay);
      this.unhide(this.runningOverlay);
      this.unhide(this.overlay);
      this.overlay.className = 'running';

      this.unhide(this.runningOverlay);
    }.bind(this);


    this.pauseBtn.onclick = function(event) {
      if (this.pauseBtn.innerHTML === '<i class="material-icons">pause_circle_outline</i>') {
        this.pauseBtn.innerHTML = '<i class="material-icons">play_circle_outline</i>';
        this.gameStateObj.pause();
      } else {
        this.pauseBtn.innerHTML = '<i class="material-icons">pause_circle_outline</i>';
        this.gameStateObj.unpause();
      }
    }.bind(this);

    document.getElementsByClassName('material-icons').onclick = function(event) {
      event.stopPropogation();
    };
  }

  hide(el) {
    if (!el.className.match(/(?:^|\s)hidden(?!\S)/)) {
      el.className += ' hidden';
    }
  }

  unhide(el) {
    if (el.className.match(/(?:^|\s)hidden(?!\S)/)) {
      el.className = el.className.replace(/(?:^|\s)hidden(?!\S)/g, '');
    }
  }

  updateUI(gameStateObj) {
    this.pauseBtn.innerHTML = (gameStateObj.paused) ? '<i class="material-icons">play_circle_outline</i>' : '<i class="material-icons">pause_circle_outline</i>';
    this.currentScoreValue.innerHTML = gameStateObj.playerScore;
    this.distanceTraveled.innerHTML = gameStateObj.distance;
  }

}
