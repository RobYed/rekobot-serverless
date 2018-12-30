module.exports = function (...stuffToLog) {
  if (process.env.LOGGING) {
    console.log(...stuffToLog)
  }
};
