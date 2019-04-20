
export class UserInterface {
  constructor() {
    this.container = document.getElementById('container');

  }

  hide(el) {
    if (!el.className.match(/(?:^|\s)hidden(?!\S)/)) {
      el.className += ' hidden';
    }
  }

  unhide(el) {
    if (!el.className.match(/(?:^|\s)hidden(?!\S)/)) {
      el.className = el.className.replace(/(?:^|\s)hidden(?!\S)/g, '');
    }
  }
}
