const ul = document.querySelector(".n-links");
const burger = document.querySelector(".n-burger");
const nav = document.querySelector(".n-nav");
const active = "n-active";
const {preset, preventFast, each} = require('./_helpers');

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
  }
};



