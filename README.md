# kissui.scrollanim
CSS3 scroll animation library

This library is a part of Kissui project.

# Install

## Bower

You can use bower to install the package:

```
bower install kissui.scrollanim
```

## CDN

You can use **cdnjs**: https://cdnjs.com/libraries/kissui.scrollanim


## Manually
You can also download and include files manually from the latest [releases](https://github.com/usablica/kissui.scrollanim/releases).

# Getting Started

This projects doesn't have any dependecies. All you need to do is to include the `scrollanim.js` and `scrollanim.css` in your page.

> Please note that you don't need jQuery, Angular.js, React, Whatever. 

Write your first awesome scroll animation:

```html
<p data-kui-anim="fadeIn">Show this with fade-in</p>
```

Simple, isn't it?   

Need more help? have a look at `/example` folder in the project OR http://scrollanim.kissui.io


# Adding animations

You can add animations using `data-kui-...` attributes **or** programmatiaclly using the `kissuiScrollAnim.add` method. Read following sections for more details.

## `data-kui` attributes

Currently we have two attributes to define the options:

  - `data-kui-anim`: Mandatory. Animation name. see [Animations](#animations) section.
  - `data-kui-event`: Option to define the event to trigger. see [Events](#events) section. Default is `in`.

Example:   

```html
<div data-kui-anim="fadeIn" data-kui-event="top">
```

## Programmatically (JSON)

Also, you can use the `kissuiScrollAnim.add` method to add the animations.

Example:

```javascript
kissuiScrollAnim.add(element, {
  'in': 'fadeIn'
});
```

# Options

There are some options to define the default values in Scrollanim.

  - `triggerOnInit`: Trigger the events on module init (automatically after page load)?. Default is `true`.
  - `attributePrefix`: Prefix for all `data-...` attributes. Default is `data-kui-`.
  - `animAttribute`: Name of animation attribute. Default is `anim`
  - `eventAttribute`: Event attribute name. Default is `event`
  - `defaultEvent`: Default event to trigger when `data-kui-event` is not provided. Default is `in`
  - `autoReset`: Reset the animation event after element is out of the viewport?. Defualt is `true`

To alter event you can use `setOption` or `setOptions` methods:

```javascript
kissuiScrollAnim.setOption('autoReset', false)
```

or

```javascript
kissuiScrollAnim.setOptions({ 
  'autoReset': false,
  'triggerOnInit': false
})
```

# Events

Scrollanim uses [`kissui.position`](https://github.com/usablica/kissui.position) to manage and track elements. Please note that `kissui.position` is a builtin dependency and you don't need to include anything in your page.

`Kissui.position` supports these events:

- `in` - when element is in the viewport
- `out` - when element is not in the viewport
- `middle` - center aligned element (vertically)
- `center` - center aligned element (horizontally)
- `top` - element at the top of the page
- `bottom` - element at the bottom of the page
- `left` - element at the left side of the page
- `right` - element at the right side of the page

Also, it is possible to use a compond of events together, e.g. `center middle`, `in right` or `out left`. Please check out [`kissui.position`](https://github.com/usablica/kissui.position) for more information.

It is possible to use both `data-kui-anim` attribute and `kissuiScrollAnim.add(element, event)` to bind an element and reveal it after scrolling but please note that `data-kui-anim` attribute uses `in` event of `kissui.position` by default.

An example of adding an element using the API:

```javascript
kissuiScrollAnim.add(element, {
  'in': 'fadeIn'
});
```

Or

```javascript
kissuiScrollAnim.add(element, {
  'center middle': 'fadeIn'
});
```

Or


```javascript
kissuiScrollAnim.add(element, {
  'center middle': 'fadeIn',
  'out': 'fadeOut'
});
```

Super cool.

<img width=200 src='http://adorablekittens.com/wp-content/uploads/2015/09/supercoolcat.jpg' />

# Animations

Scrollanim uses Animate.css as a builtin dependency to provide stunnishing animations. 

Here is a list of supported animations:
* `bounce`
  * `flash`
  * `pulse`
  * `rubberBand`
  * `shake`
  * `headShake`
  * `swing`
  * `tada`
  * `wobble`
  * `jello`
  * `bounceIn`
  * `bounceInDown`
  * `bounceInLeft`
  * `bounceInRight`
  * `bounceInUp`
  * `bounceOut`
  * `bounceOutDown`
  * `bounceOutLeft`
  * `bounceOutRight`
  * `bounceOutUp`
  * `fadeIn`
  * `fadeInDown`
  * `fadeInDownBig`
  * `fadeInLeft`
  * `fadeInLeftBig`
  * `fadeInRight`
  * `fadeInRightBig`
  * `fadeInUp`
  * `fadeInUpBig`
  * `fadeOut`
  * `fadeOutDown`
  * `fadeOutDownBig`
  * `fadeOutLeft`
  * `fadeOutLeftBig`
  * `fadeOutRight`
  * `fadeOutRightBig`
  * `fadeOutUp`
  * `fadeOutUpBig`
  * `flipInX`
  * `flipInY`
  * `flipOutX`
  * `flipOutY`
  * `lightSpeedIn`
  * `lightSpeedOut`
  * `rotateIn`
  * `rotateInDownLeft`
  * `rotateInDownRight`
  * `rotateInUpLeft`
  * `rotateInUpRight`
  * `rotateOut`
  * `rotateOutDownLeft`
  * `rotateOutDownRight`
  * `rotateOutUpLeft`
  * `rotateOutUpRight`
  * `hinge`
  * `rollIn`
  * `rollOut`
  * `zoomIn`
  * `zoomInDown`
  * `zoomInLeft`
  * `zoomInRight`
  * `zoomInUp`
  * `zoomOut`
  * `zoomOutDown`
  * `zoomOutLeft`
  * `zoomOutRight`
  * `zoomOutUp`
  * `slideInDown`
  * `slideInLeft`
  * `slideInRight`
  * `slideInUp`
  * `slideOutDown`
  * `slideOutLeft`
  * `slideOutRight`
  * `slideOutUp`
  

We always keep an up-to-date version on Animate.css. 

# Author
Afshin Mehrabani

Thanks to Daniel Eden for making [animate.css](https://github.com/daneden/animate.css)

# License
MIT
