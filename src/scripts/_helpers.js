function preventMultipleExecution(time, fn) {
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

function each(items, callback, context) {
  for(var i = 0; i < items.length; i++) {
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