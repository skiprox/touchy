'use strict';

var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;
var defaults = require('defaults');

var defaultValues = {
	preventDefault: false
};

/**
 * Touch Events
 * @param {String} - containerEl: The query string for the element to apply touch events to
 * @param {Object} - Obj: The object of options
 *
 * *** @param {String} - preventDefault: Whether to add preventDefault to the events
 */
function Touchy(containerEl, obj) {
	// Call the superclass constructor
	EventEmitter.call(this);

	// Establish the properties of the object
	this.settings = {};
	this.elems = {};
	this.props = {};
	this._establishProperties(containerEl, obj);

	// Bindings
	this._onTouchMove = this._onTouchMove.bind(this);

	// Add the event listeners
	this._addListeners();
}

// Inherit from EventEmitter for Modal
inherits(Touchy, EventEmitter);

// Store the prototype in a variable for ease and fun!
var proto = Touchy.prototype;

/**
 * Establish the object properties
 */
proto._establishProperties = function(containerEl, obj) {
	this.settings = defaults(obj, defaultValues);
	this.elems.container = document.querySelector(containerEl);
	// The list of properties of the touch events we want to manually calculate and track
	this.props.deltaStart = null;
	this.props.deltaCurrent = null;
	this.props.deltaEnd = null;
	this.props.deltaX = null;
	this.props.deltaY = null;
};

/**
 * Add Event Listeners
 */
proto._addListeners = function() {
	this.elems.container.addEventListener('touchmove', this._onTouchMove);
};

/**
 * Remove listeners
 */
proto._removeListeners = function() {
	this.elems.container.removeEventListener('touchmove', this._onTouchMove);
};

/**
 * All the touch events.
 * The idea is to emit events that we can listen to elsewhere once we create the Touchy object.
 * So we want to attach certain things to the `event` (e), like DeltaX, DeltaY, etc.
 * Otherwise we might as well use normal touch events in our main function, instead of using Touchy.
 */
// Touchmove
proto._onTouchMove = function(e) {
	this.emit('pan', e);
};

/**
 * Destroys the gallery
 */
proto.destroy = function() {
	this._removeListeners();
	this.settings = {};
	this.props = {};
	this.elems = {};
};

module.exports = Touchy;
