import $ from 'jquery';
import _ from 'lodash';

/**
 * Object to manage images and other assets for the game
 * 
 * These urls should be relative urism using the src directory as its root
 *  directory
 *
 * @export
 * @class Assets
 */
export class Assets {
  constructor() {
    this.assets = {
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
    };
    this.loaded = [];

    this.load = function() {
      let assetPromises = [];
      _.each(this.assets, function(asset, assetName) {
        let assetImage = new Image();
        let assetDeferred = new $.Deferred();
        assetImage.onload = function() {
          assetImage.width /= 2;
          assetImage.height /= 2;
          this.loaded[assetName] = assetImage;
          assetDeferred.resolve();
        }.bind(this);
        assetImage.src = asset;
        assetPromises.push(assetDeferred.promise());
      }.bind(this));
      return $.when.apply($, assetPromises);
    };
  }
}

