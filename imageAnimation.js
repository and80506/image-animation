;(function (root, factory) {
	var imageAnimation = factory(root);
	// AMD
	if ( typeof define === 'function' && define.amd ) {
		define('imageLoader', function () {
			return imageAnimation;
		});
  // Node.js
	} else if ( typeof exports === 'function' ) {
		module.exports = imageAnimation;
  // Browser globals
	} else {
		root.ImageAnimation = imageAnimation;
	}
}(this, function (root) {
	'use strict';
	var ImageAnimation = function (id, options) {
		this.init(id, options);
	};
	ImageAnimation.prototype = {
		init: function (id, options) {
      var lastTime = 0;
      // fix requestAnimationFrame
      var vendors = ['ms', 'moz', 'webkit', 'o'];
      for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                     || window[vendors[x]+'CancelRequestAnimationFrame'];
      }
      if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
          var currTime = new Date().getTime();
          var timeToCall = Math.max(0, 16 - (currTime - lastTime));
          var id = window.setTimeout(function() {
            callback(currTime + timeToCall);
          }, timeToCall);
          lastTime = currTime + timeToCall;
          return id;
        };
		 	}
      if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
      }
			var imgLoader = new ImageLoader();
			imgLoader.onComplete = function() {
        var imageElement = document.getElementById(id);
        var start = window.mozAnimationStartTime || Date.now();
        function step(timestamp) {
          var progress = timestamp || ( Date.now() - start );
          step.count++;
          if ( step.count % options.frameMultiple == 0 ){
            imageElement.src = options.prefix + options.current + options.suffix;
            if ( options.current >= options.end ) {
              if ( step.loopPlayTimes >= options.loopPlayTimes ) {
                step.stop = true;
              }
              options.current = options.start;
              step.loopPlayTimes++;
            }
            options.current++;
            console.log(progress)
          }
          if ( progress < options.progress && !step.stop ) {
            requestAnimationFrame(step);
          }
        }
        step.count = 0;
        step.loopPlayTimes = 0;
        requestAnimationFrame(step);
			};
      var imagesArr = this.getImagesArr(options);
      imgLoader.load(imagesArr);
		},
    getImagesArr: function(config) {
      var start = config.start,
        end = config.end,
        arr = [];
      for (; start < end; start++) {
        arr.push(config.prefix + start + config.suffix);
      }
      return arr;
    }
	};
	return ImageAnimation;
}));