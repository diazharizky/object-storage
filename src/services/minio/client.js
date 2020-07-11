'use strict'

require('../../types')
const config = require('config')
const minio = require('minio')

/**
 *
 * @type {import('minio').Client}
 */
const client = new minio.Client({
  endPoint: config.get('minio.host'),
  port: 9000,
  useSSL: false,
  accessKey: config.get('minio.access_key'),
  secretKey: config.get('minio.secret_key')
})

exports = module.exports = client
