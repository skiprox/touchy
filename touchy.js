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
	this._onTouchStart = this._onTouchStart.bind(this);
	this._onTouchEnd = this._onTouchEnd.bind(this);
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
	this.props.type = null;
	this.props.deltaX = null;
	this.props.deltaY = null;
	this.props.deltaXStart = null;
	this.props.deltaYStart = null;
};

/**
 * Add Event Listeners
 */
proto._addListeners = function() {
	this.elems.container.addEventListener('touchstart', this._onTouchStart);
	this.elems.container.addEventListener('touchend', this._onTouchEnd);
	this.elems.container.addEventListener('touchmove', this._onTouchMove);
};

/**
 * Remove listeners
 */
proto._removeListeners = function() {
	this.elems.container.removeEventListener('touchstart', this._onTouchStart);
	this.elems.container.removeEventListener('touchend', this._onTouchEnd);
	this.elems.container.removeEventListener('touchmove', this._onTouchMove);
};

/**
 * All the touch events.
 * The idea is to emit events that we can listen to elsewhere once we create the Touchy object.
 * So we want to attach certain things to the `event` (e), like DeltaX, DeltaY, etc.
 * Otherwise we might as well use normal touch events in our main function, instead of using Touchy.
 */

// Touchstart
proto._onTouchStart = function(e) {
	this.props.deltaXStart = e.touches[0].clientX;
	this.props.deltaYStart = e.touches[0].clientY;
	this.emit('panstart', e);
};

// Touchend
proto._onTouchEnd = function(e) {
	this.emit('panend', e);
};

// Touchmove
proto._onTouchMove = function(e) {
	this.props.deltaX = e.touches[0].clientX - this.props.deltaXStart;
	this.props.deltaY = e.touches[0].clientY - this.props.deltaYStart;
	this.updateEventValues(e);
	this.emit('pan', e);
};

/**
 * Update the properties attached to e
 * @param {Event} - e: The touch event, passed here by one of the listener functions
 */
proto.updateEventValues = function(e) {
	e.deltaX = this.props.deltaX;
	e.deltaY = this.props.deltaY;
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
