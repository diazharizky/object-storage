'use strict'

require('../../types')
const core = require('../../core')
const log = require('../../utils/log')

const params = (exports.params = {
  bucketID: 'bucket_id',
  objectID: 'object_id'
})

const queries = (exports.queries = {
  prefix: 'prefix'
})

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {*}
 */
async function get (req, res) {
  const bucketID = req.params[params.bucketID]
  const prefix = req.query[queries.prefix]
  const objectID = !prefix
    ? req.params[params.objectID]
    : prefix + '/' + req.params[params.objectID]
  /**
   *
   * @type {[ErrorKind, import('stream').Stream]}
   */
  const [err, stream] = await core.objects.get(bucketID, objectID)
  if (err) {
    log.error({
      msg: err.message,
      error: err
    })
    return res.status(err.statusCode || 500).json({
      message: err.message || 'internal_server_error'
    })
  }
  stream.pipe(res)
}
exports.get = get

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {*}
 */
async function list (req, res) {
  const bucketID = req.params[params.bucketID]
  let prefix = req.query[queries.prefix]
  if (prefix) {
    prefix += '/'
  }
  const [err, data] = await core.objects.list(bucketID, prefix)
  if (err) {
    log.error({
      msg: err.message,
      error: err
    })
    return res.status(err.statusCode || 500).json({
      message: err.message || 'internal_server_error'
    })
  }
  res.status(200).json({ data })
}
exports.list = list

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {*}
 */
async function put (req, res) {
  const bucketID = req.params[params.bucketID]
  const prefix = req.query[queries.prefix]
  const objectID = !prefix
    ? req.params[params.objectID]
    : prefix + '/' + req.params[params.objectID]
  const [err] = await core.objects.put(bucketID, objectID, req.file.buffer)
  if (err) {
    log.error({
      msg: err.message,
      error: err
    })
    return res.status(err.statusCode || 500).json({
      message: err.message || 'internal_server_error'
    })
  }
  res.status(200).json({
    message: 'object_stored'
  })
}
exports.put = put
