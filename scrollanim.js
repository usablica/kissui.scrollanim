/**
 * CSS3 scroll animation
 *
 * MIT licensed. By Afshin Mehrabani <afshin.meh@gmail.com>
 *
 * This project is a part of Kissui framework.
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kissuiPosition'], function (kissuiPosition) {
      return (root.kissuiScrollAnim = factory(kissuiPosition));
    });
  } else {
    root.kissuiScrollAnim = factory(root.kissuiPosition);
  }
}(this, function (kissuiPosition) {

  /**
  * options
  */
  var _options = {
    //trigger the events on module init?
    triggerOnInit: true,
    attribute: 'data-kui-anim'
  };

  /**
  * To store all available elements with their options
  */
  var _elements = [];

  /**
  * Find elements
  */
  function _populate () {
    //clear old elements first
    _elements = [];

    var elements = document.querySelectorAll('*[' + _options.attribute + ']');

    for (var i = 0;i < elements.length;i++) {
      var element = elements[i];
      var event = element.getAttribute(_options.attribute);

      _add(element, {
        'in': event
      });
    }
  };

  /**
  * Adds a new item to _elements array
  *
  * Sample event object:
  * {
  *   'in': 'fadeIn',
  *   'out': 'fadeOut'
  * }
  *
  * See kissui.position for more options to bind events.
  */
  function _add (element, event) {
    var eventObj = {};

    for (var e in event) {
      kissuiPosition.add(element, e);

      eventObj[e] = {
        animation: event[e],
        // adding active flag
        active: false
      };
    }

    // add visibility: hidden to the element
    element.style.opacity = '0';

    _elements.push({
      element: element,
      event: eventObj
    });
  };

  /**
  * Finds an element by looking into the _elements
  *
  */
  function _find (element) {
    for (var i = 0;i < _elements.length; i++) {
      var elx = _elements[i];

      if (element === elx.element) {
        return elx;
      }
    }

    return null;
  };

  /**
  * Attaching corresponded css3 class to the element
  *
  */
  function _attach (element, event) {
    for (var e in element.event) {
      if (e == event && element.event[e].active === false) {

        element.element.style.opacity = '1';
        element.element.className += ' animated ' + element.event[e].animation;


        (function (element, e) {
          _addEventListener(element.element, [
            'webkitAnimationEnd',
            'mozAnimationEnd',
            'MSAnimationEnd',
            'oanimationend',
            'animationend'], function () {
              element.element.className = element.element.className.replace('animated ' + element.event[e].animation, '');

              //set this flag to prevent processing same element twice
              element.event[e].active = true;
            });
        }(element, e));

      }
    }
  };

  /**
  * To bind an event to browser
  *
  */
  function _addEventListener (element, event, fn) {
    // is event an array?
    if (typeof (event) == 'object') {
      for (var i = 0; i < event.length;i++) {
        _addEventListener(element, event[i], fn);
      }
    }

    if (element.addEventListener) { // modern browsers including IE9+
      element.addEventListener(event, fn, false);
    } else if (element.attachEvent) { // IE8 and below
      element.attachEvent('on' + event, fn);
    }
  };

  /**
  * Start the module
  */
  function _init () {
    _populate.call(this);

    kissuiPosition.on('*', function (element, event) {
      _attach(_find(element), event);
    });

    kissuiPosition.init();
  };

  _init()

  return {
    _options: _options,
    _elements: _elements,
    init: _init,
    add: _add
  };
}));
