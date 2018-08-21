function baseLogic (target, type) {
  if(Object.prototype.toString.call(target) === `[object ${type}]`) {
    return true;
  }
  return false;
}

function isBoolean(target) {
  return baseLogic(target, 'Boolean');
}

function isString(target) {
  return baseLogic(target, 'String');
}

function isNumber(target) {
  return baseLogic(target, 'Number');
}

function isUndefined(target) {
  return baseLogic(target, 'Undefined');
}

function isObject(target) {
  return baseLogic(target, 'Object');
}

function isArray(target) {
  return baseLogic(target, 'Array');
}

export {isBoolean};
export {isString};
export {isNumber};
export {isUndefined};
export {isObject};
export {isArray};
