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
  accessKey: 'object-storage',
  secretKey: 'object-storage'
})

exports = module.exports = client
