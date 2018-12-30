const log = require('../utils/log');
const htmlPdf = require('html-pdf-chrome');
const expenseHtmlFactory = require('./expense-html-factory');

const CHROME_DEBUG_PORT = 9222;

module.exports.handler = async function (event, context, callback) {
  log('Start processing expense...');

  if (event.body === null || event.body === undefined) {
    return callback(null, { statusCode: 400, body: 'request body missing', headers: { 'Content-Type': 'text/plain' } });
  }

  const html = await expenseHtmlFactory.getHtml(JSON.parse(event.body));
  
  const startTime = Date.now();

  const pdf = await htmlPdf.create(html, { port: CHROME_DEBUG_PORT });

  log(`It took ${Date.now() - startTime}ms to load template and render PDF.`);

  return callback(null, {
    statusCode: 200,
    body: pdf.toBase64(),
    isBase64Encoded: true,
    headers: {
      'Content-Type': 'application/pdf',
    },
  });
};