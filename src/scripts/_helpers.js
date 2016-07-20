export function preventMultipleExecution(time, fn) {
  var prev = 0;
  return (...args) => {
    var now = Date.now();
    if(now - prev > time) {
      prev = now;
      return fn(...args);
    }
  }
}

export function preset(fn, args, context) {
  return (...extra) => {
    return fn.apply(context, args.concat(extra));
  };
}

export function each(collection, callback, context) {
  for(var i = 0; i < collection.length; i++) {
    callback.call(context, collection[i], i, collection);
  }
}

export function serialize(...fns) {
  return (...args) => {
    fns.forEach(fn => {
      fn(...args);
    });
  };
}

export const preventFast = preset(preventMultipleExecution, [30]);