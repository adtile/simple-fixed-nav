const ul = document.querySelector(".n-links");
const burger = document.querySelector(".n-burger");
const nav = document.querySelector(".n-nav");
const active = "n-active";
const {preset, preventFast, each, serialize} = require('./_helpers');

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.returnValue = false;  
}

function toggle(elem, className) {
  if(elem.classList.contains(className)){
    elem.classList.remove(className);
  } else {
    elem.classList.add(className);
  }
}

function remove(elem, className) {
  elem.classList.remove(className);
}

function add(elem, className) {
  elem.classList.add(className)
}

var fixedNav = window.fixedNav = {
  toggle: preventFast(preset(toggle, [nav, active])),
  close: preventFast(preset(remove, [nav, active])),
  open: preventFast(preset(add, [nav, active]))
};

burger.addEventListener("touchend", serialize(fixedNav.toggle, preventDefault));
burger.addEventListener("click", serialize(fixedNav.toggle, preventDefault));
