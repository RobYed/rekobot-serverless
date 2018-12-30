const log = require('../utils/log');
const pdf = require('../utils/pdf');

const printOptions = {
  landscape: false,
  displayHeaderFooter: false,
  printBackground: true,
  scale: 1,
  paperWidth: 8.27, // A4
  paperHeight: 11.69, // A4
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  pageRanges: '',
};

module.exports.handler = async function (event, context, callback) {
  log('Start processing expense...');

  const url = 'https://www.reactivemanifesto.org/de';
  const startTime = Date.now();
  let data;

  try {
    data = await pdf(url, printOptions);
  } catch (error) {
    console.error('Error printing pdf for', url, error);
    return callback(error);
  }

  log(`Chromium took ${Date.now() - startTime}ms to load page and render PDF.`);

  return callback(null, {
    statusCode: 200,
    body: data,
    isBase64Encoded: true,
    headers: {
      'Content-Type': 'application/pdf',
    },
  });
};