;(function (root, factory) {
  var imageLoader = factory(root);
  // AMD
  if ( typeof define === 'function' && define.amd ) {
    define('imageLoader', function () {
      return imageLoader;
    });
  // Node.js
  } else if ( typeof exports === 'function' ) {
    module.exports = imageLoader;
  // Browser globals
  } else {
    root.ImageLoader = imageLoader;
  }
}(this, function (root) {
  'use strict';
  var ImageLoader = function(source) {
    this.loading = false; //ready-only
    this._index = -1;
    this._loaded = 0;
    if (source) {
      this._addSource(source);
    }
  };
  ImageLoader.prototype._addSource = function(source) {
    if (!source) return;
    source = (source instanceof Array) ? source : [source];
    if (!this._source) this._source = source;
    else this._source = this._source.concat(source);
  };
  ImageLoader.prototype.load = function(source) {
    if (source) {
      this._addSource(source);
    }
    if (!this.loading) this._loadNext();
  };
  ImageLoader.prototype.addEventOnLoaded = function(callback) {
    this.onLoaded = callback;
  };
  ImageLoader.prototype.addEventOnComplete = function(callback) {
    this.onComplete = callback;
  };
  ImageLoader.prototype._loadNext = function() {
    var that = this;
    this._index++;
    if (this._index >= this._source.length) {
      if (this.onComplete) {
        this.onComplete.call(this, this._source);
      }
      this._source = [];
      this.loading = false;
      this._index = -1;
      return;
    }

    var src = this._source[this._index];
    var img = new Image();
    img.onload = function() {
      that._loadHandler.call(that);
    };
    img.onerror = function() {
      that._loadErrorHandler.call(that);
    };
    img.src = src;
    this.loading = true;
  };
  ImageLoader.prototype._loadHandler = function(e) {
    this._loaded++;
    var src = this._source[this._index];
    if (this.loaded) {
      this.loaded.call(this, src);
    }
    this._loadNext();
  };
  ImageLoader.prototype._loadErrorHandler = function(e) {
    this._loaded++;
    var src = this._source[this._index];
    if (this.loaded) {
      this.loaded.call(this, src);
    }
    this._loadNext();
  };
  ImageLoader.prototype.getLoaded = function() {
    return this._loaded;
  };
  ImageLoader.prototype.getTotal = function() {
    return this._source.length;
  };
  return ImageLoader;
}));