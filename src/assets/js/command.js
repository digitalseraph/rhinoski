/**
 * Command class (abstract)
 */
export class Command {
  constructor() {
    if (this.constructor === Command) {
      throw new Error('Abstract classes can\'t be instantiated.');
    }
  }

  execute() {
    throw new Error('Method \'execute\' must be implemented.');
  }
}





