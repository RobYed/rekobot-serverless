# rekobot functions

* expense: turns a travel expense json into a properly formatted pdf preview

## Install and Deploy

1. `npm install`
2. [set-up your provider credentials](https://serverless.com/framework/docs/providers/aws/guide/credentials/)
3. `npm run deploy`

## Test

1. copy the POST API URL from console output after deployment
2. start a POST Request to that API with:
    - Header 'Accept' = 'application/pdf'
    - Body: copy contents of [expense-example-data.json](./expense-example-data.json)

## TODO

* full data model usage
* data conversions
* template styling
* input validation
* signing the pdf
* switch to TypeScript
* send mail with pdf attached
* add rekobot logo