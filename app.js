'use strict'

require('./src/types')
const swaggerUI = require('swagger-ui-express')
const bodyParser = require('body-parser')
const multer = require('multer')
const formData = require('express-form-data')

const app = (module.exports = require('express')())
const swaggerDocument = require('js-yaml').load(
  require('fs').readFileSync('./config/swagger.yml', 'utf8')
)

const options = {
  uploadDir: require('os').tmpdir(),
  autoClean: true
}

app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 1000000
  })
)
app.use(formData.parse(options))
app.use(formData.format())
app.use(formData.stream())
app.use(formData.union())
app.use(require('./src/routes/router'))
app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

/**
 *
 * @class
 * @param {string} statusCode
 * @param {string} message
 * @param {?object} data
 */
function MyError (statusCode, message, data) {
  this.statusCode = statusCode
  this.message = message
  this.data = data || {}
}
global.MyError = MyError
