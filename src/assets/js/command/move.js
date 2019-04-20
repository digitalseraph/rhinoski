import { Command } from '../command';

/**
 * Move Left Command
 */
export class MoveLeftCommand extends Command {
  constructor(actor) {
    super(actor);
    this.actor = actor;
  }

  execute() {
    this.actor.x -= this.actor.speed;

    switch (this.actor.direction) {
      case 0: // crash
        this.actor.direction++;
        break;
      case 1: // left
        break;
      case 2: // left-down
        this.actor.direction--;
        break;
      case 5: // right
        this.actor.direction = 1;
        break;
      default:
        this.actor.direction = 2;
    }

  }
}

/**
 * Move Right Command
 */
export class MoveRightCommand extends Command {
  constructor(actor) {
    super(actor);
    this.actor = actor;
  }

  execute() {
    this.actor.x += this.actor.speed;

    switch (this.actor.direction) {
      case 0: // crash
        this.actor.direction = 5;
        break;
      case 1: // left
        this.actor.direction = 5;
        break;
      case 3: // down
        this.actor.direction++;
        break;
      case 4: // right-down
        this.actor.direction++;
        break;
      case 5: // right
        break;
      default:
        this.actor.direction = 4;
        break;
    }

  }
}

/**
 * Move Up Command
 */
export class MoveUpCommand extends Command {
  constructor(actor) {
    super(actor)
    this.actor = actor
  }

  execute() {
    this.actor.y -= this.actor.speed;

    switch (this.actor.direction) {
      case 1:
        break;
      case 2:
        this.actor.direction--;
        break;
      default:
        this.actor.direction = 5;
        break;
    }
  }
}

/**
 * Move Down Command
 */
export class MoveDownCommand extends Command {
  constructor(actor) {
    super(actor)
    this.actor = actor
  }

  execute() {
    this.actor.direction = 3;
  }
}
