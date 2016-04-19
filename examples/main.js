/*jshint -W121, -W018*/
'use strict';

var Touchy = require( './../touchy.js' );

var Main = (function() {

	return {
		init : function() {
			var touchy = new Touchy('.container');
			touchy.on('pan', function(e) {
				console.log('pan', e);
			});
			touchy.on('panend', function(e) {
				console.log('panend', e);
			});
			return this;
		}
	};

}());

module.exports = Main.init();
