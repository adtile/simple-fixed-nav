const ul = document.querySelector(".n-links");
const burger = document.querySelector(".n-burger");
const nav = document.querySelector(".n-nav");
const active = "n-active";

function preventFastExecution(time, fn) {
  var prev = 0;
  return function (...args) {
    var now = Date.now();
    if(now - prev > time) {
      prev = now;
      return fn(...args);
    }
  }
}

function preset(fn, presetArgs, context) {
  return function (...args) {
    return fn.apply(context, presetArgs.concat(args));
  };
}

const preventFast = preset(preventFastExecution, [30]);

function each(items, callback, context) {
  for(var i = 0; i < items.length; i++) {
    callback.call(context, items[i], i, items);
  }
}

function toggle(elem, className, e) {
  e.stopPropagation();
  if(elem.classList.contains(className)){
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
  elem.classList.add(className)
}

var fixedNav = window.fixedNav = {

};
fixedNav.toggle = preventFast(preset(toggle, [ul, active]));
fixedNav.close = preventFast(preset(remove, [ul, active]));
fixedNav.open = preventFast(preset(add, [ul, active]));
fixedNav.init = options => {
  const closeOnAnchorTap = !!options.closeOnAnchorTap;
  const closeOnOutsideScroll = !!options.closeOnOutsideScroll;
  const closeOnOutsideTap = !!options.closeOnOutsideTap;

  burger.addEventListener("touchend", fixedNav.toggle);
  burger.addEventListener("click", fixedNav.toggle);

  nav.addEventListener("scroll", e => e.stopPropagation());

  if(closeOnAnchorTap) {
    each(document.querySelectorAll(".n-links a"), function (a, i, all) {
      a.addEventListener("touchend", fixedNav.close);
      a.addEventListener("click", fixedNav.close);
    });
  }

  if(closeOnOutsideScroll) {
    window.addEventListener("scroll", fixedNav.close);
    // window.addEventListener("scroll", function () {
    //   console.log("scrolling");
    // })
    document.body.addEventListener("touchmove", fixedNav.close);
  }

  if(closeOnOutsideTap) {
    document.body.addEventListener("click", fixedNav.close);
    document.body.addEventListener("touchend", fixedNav.close);
  }
};


