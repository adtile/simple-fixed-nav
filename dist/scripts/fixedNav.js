"use strict";

var ul = document.querySelector(".n-links");
var burger = document.querySelector(".n-burger");
var nav = document.querySelector(".n-nav");
var active = "n-active";

function preventFastExecution(time, fn) {
  var prev = 0;
  return function () {
    var now = Date.now();
    if (now - prev > time) {
      prev = now;
      return fn.apply(undefined, arguments);
    }
  };
}

function preset(fn, presetArgs, context) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return fn.apply(context, presetArgs.concat(args));
  };
}

var preventFast = preset(preventFastExecution, [30]);

function each(items, callback, context) {
  for (var i = 0; i < items.length; i++) {
    callback.call(context, items[i], i, items);
  }
}

function toggle(elem, className, e) {
  e.stopPropagation();
  if (elem.classList.contains(className)) {
    elem.classList.remove(className);
  } else {
    elem.classList.add(className);
  }
}

function remove(elem, className, e) {
  e.stopPropagation();
  elem.classList.remove(className);
}

function add(elem, className, e) {
  e.stopPropagation();
  elem.classList.add(className);
}

var fixedNav = window.fixedNav = {};
fixedNav.toggle = preventFast(preset(toggle, [ul, active]));
fixedNav.close = preventFast(preset(remove, [ul, active]));
fixedNav.open = preventFast(preset(add, [ul, active]));
fixedNav.init = function (options) {
  var closeOnAnchorTap = !!options.closeOnAnchorTap;
  var closeOnOutsideScroll = !!options.closeOnOutsideScroll;
  var closeOnOutsideTap = !!options.closeOnOutsideTap;

  burger.addEventListener("touchend", fixedNav.toggle);
  burger.addEventListener("click", fixedNav.toggle);

  nav.addEventListener("scroll", function (e) {
    return e.stopPropagation();
  });

  if (closeOnAnchorTap) {
    each(document.querySelectorAll(".n-links a"), function (a, i, all) {
      a.addEventListener("touchend", fixedNav.close);
      a.addEventListener("click", fixedNav.close);
    });
  }

  if (closeOnOutsideScroll) {
    window.addEventListener("scroll", fixedNav.close);
    // window.addEventListener("scroll", function () {
    //   console.log("scrolling");
    // })
    document.body.addEventListener("touchmove", fixedNav.close);
  }

  if (closeOnOutsideTap) {
    document.body.addEventListener("click", fixedNav.close);
    document.body.addEventListener("touchend", fixedNav.close);
  }
};