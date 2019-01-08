const log = require('../utils/log');
const util = require('util');
const readFile = util.promisify(require('fs').readFile);
const inlineHtml = util.promisify(require('web-resource-inliner').html);
const handlebars = require('handlebars');

handlebars.registerHelper('equals', function(v1, v2, options) {
    if (v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
});

handlebars.registerHelper('multiply', function(v1, v2, options) {
    return v1 * v2;
});

class ExpenseHtmlFactory {

    constructor() {
        this.templateFileUrl = __dirname + '/expense.template.hbs';
    }

    async getHtml(data) {
        const rawTemplate = await this.getTemplate();
        const inlinedTemplate = await this.inlineResources(rawTemplate);
        return this.fillData(inlinedTemplate, data);
    }

    async getTemplate() {
        return readFile(this.templateFileUrl, 'utf-8');
    }

    async inlineResources(template) {
        return inlineHtml({
            fileContent: template,
            images: true
        });
    }

    async fillData(template, data) {
        return handlebars.compile(template)(data);
    }
}

module.exports = new ExpenseHtmlFactory();