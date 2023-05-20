const typeOf = (value) => Object.prototype.toString.call(value).slice(8, -1);
module.exports = typeOf;
