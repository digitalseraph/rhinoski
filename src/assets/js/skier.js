export class Skier {
  constructor() {
    this.direction = 5;
    this.x = 0;
    this.y = 0;
    this.speed = 8;
    this.jumpState = 0;

    this.assetName = this.getAsset();
  }

  getAsset() {
    let direction = this.direction;
    let jumpState = this.jumpState;

    switch (direction) {
      case 0:
        this.assetName = 'skierCrash';
        break;
      case 1:
        this.assetName = 'skierLeft';
        break;
      case 2:
        this.assetName = 'skierLeftDown';
        break;
      case 3:
        this.assetName = 'skierDown';
        break;
      case 4:
        this.assetName = 'skierRightDown';
        break;
      default:
        this.assetName = 'skierRight';
    }

    switch (jumpState) {
      case 0:
        break;
      case 1:
        this.assetName = 'skierLeft';
        break;
      case 2:
        this.assetName = 'skierLeftDown';
        break;
      case 3:
        this.assetName = 'skierDown';
        break;
      case 4:
        this.assetName = 'skierRightDown';
        break;
      default:
        this.assetName = 'skierRight';
    }

    return this.assetName;
  }
}

