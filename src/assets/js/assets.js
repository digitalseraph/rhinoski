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
  constructor(assets) {
    this.assets = assets;
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

