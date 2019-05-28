import { Command } from '../command';

/**
 * Jump Command
 */
export class JumpCommand extends Command {
  constructor(actor) {
    super(actor);
    this.actor = actor;
  }

  execute() {
    this.actor.jump();
  }
}
