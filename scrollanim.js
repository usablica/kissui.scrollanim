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
    // trigger the events on module init?
    triggerOnInit: true,
    // prefix for all `data-...` attributes
    attributePrefix: 'data-kui-',
    animAttribute: 'anim',
    // when to trigger the animation?
    eventAttribute: 'event',
    // default event to trigger
    defaultEvent: 'in',
    // reset the animation event after element is out of the viewport?
    // enabling this option triggers the event each time it appears in the viewport
    autoReset: true
  };

  /**
  * To store all available elements with their options
  */
  var _elements = [];

  /**
  * Get the attribute name
  *
  */
  function __(name) {
    return _options.attributePrefix + name;
  };

  /**
  * Find elements
  */
  function _populate () {
    //clear old elements first
    _elements = [];

    var elements = document.querySelectorAll('*[' + __(_options.animAttribute) + ']');

    for (var i = 0;i < elements.length;i++) {
      var param = {};
      var element = elements[i];
      var anim = element.getAttribute(__(_options.animAttribute));
      var event = element.getAttribute(__(_options.eventAttribute)) || 'in';

      param[event] = anim;

      _add(element, param);
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

    kissuiPosition.add(element, 'out');

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
  * Clear animation, reset `opacity` and `active` flag on an element
  *
  */
  function _resetElement (element) {
    var elx = _find(element)

    for (var e in elx.event) {
      elx.event[e].active = false;
    }

    element.style.opacity = 0;
  };

  /**
  * Set option
  *
  */
  function _setOption (name, value) {
    _options[name] = value;
  };

  /**
  * Set an object of options
  */
  function _setOptions (options) {
    for (var o in options) {
      _setOption(o, options[o]);
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

    // to manage `autoReset`
    kissuiPosition.on('out', function (element) {
      if (_options.autoReset) {
        _resetElement(element);
      }
    });

    kissuiPosition.init();
  };

  _init()

  return {
    _options: _options,
    _elements: _elements,
    init: _init,
    add: _add,
    setOption: _setOption,
    setOptions: _setOptions
  };
}));
