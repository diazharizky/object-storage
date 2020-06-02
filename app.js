'use strict'

require('./src/types')
const express = require('express')
const swaggerUI = require('swagger-ui-express')
const bodyParser = require('body-parser')
const app = (module.exports = express())
const swaggerDocument = require('js-yaml').load(
  require('fs').readFileSync('./config/swagger.yml', 'utf8')
)

app.use(bodyParser.json({ limit: '50mb' }))
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 1000000
  })
)
app.use(require('./src/routes/router'))
app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

/**
 *
 * @constructor
 * @param {string} statusCode
 * @param {string} message
 * @param {?object} data
 */
function MyError (statusCode, message, data = {}) {
  this.statusCode = statusCode
  this.message = message
  this.data = data
}
global.MyError = MyError
