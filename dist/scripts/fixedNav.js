(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function preventMultipleExecution(time, fn) {
  var prev = 0;
  return function (...args) {
    var now = Date.now();
    if (now - prev > time) {
      prev = now;
      return fn(...args);
    }
  };
}

function preset(fn, presetArgs, context) {
  return function (...args) {
    return fn.apply(context, presetArgs.concat(args));
  };
}

function each(items, callback, context) {
  for (var i = 0; i < items.length; i++) {
    callback.call(context, items[i], i, items);
  }
}

const preventFast = preset(preventMultipleExecution, [30]);

module.exports = {
  preventMultipleExecution,
  preset,
  each,
  preventFast
};

},{}],2:[function(require,module,exports){
const ul = document.querySelector(".n-links");
const burger = document.querySelector(".n-burger");
const nav = document.querySelector(".n-nav");
const active = "n-active";
const { preset, preventFast, each } = require('./_helpers');

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

var fixedNav = window.fixedNav = {
  toggle: preventFast(preset(toggle, [ul, active])),
  close: preventFast(preset(remove, [ul, active])),
  open: preventFast(preset(add, [ul, active])),
  init(options) {
    const closeOnAnchorTap = !!options.closeOnAnchorTap;
    const closeOnOutsideScroll = !!options.closeOnOutsideScroll;
    const closeOnOutsideTap = !!options.closeOnOutsideTap;

    burger.addEventListener("touchend", fixedNav.toggle);
    burger.addEventListener("click", fixedNav.toggle);
    nav.addEventListener("scroll", e => e.stopPropagation());

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
  }
};

},{"./_helpers":1}]},{},[2])