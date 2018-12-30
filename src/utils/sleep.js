module.exports = function (miliseconds = 100) {
  return new Promise(resolve => setTimeout(() => resolve(), miliseconds))
};
