'use strict'

require('../../types')
const core = require('../../core')
const log = require('../../utils/log')

const params = {
  bucketID: 'bucket_id',
  objectID: 'object_id'
}

const queries = {
  prefix: 'prefix',
  type: 'type'
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const get = async (req, res) => {
  const bucketID = req.params[params.bucketID]
  const prefix = req.query[queries.prefix]
  const objectID = !prefix
    ? req.params[params.objectID]
    : prefix + '/' + req.params[params.objectID]
  const contentType = req.query[queries.type] || 'application/octet-stream'
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
  const data = []
  stream.on('data', (chunk) => data.push(chunk))
  stream.on('end', () => {
    const buffer = Buffer.concat(data)
    res.contentType(contentType)
    res.send(buffer)
  })
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const list = async (req, res) => {
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

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const put = async (req, res) => {
  const bucketID = req.params[params.bucketID]
  const prefix = req.query[queries.prefix]
  const objectID = !prefix
    ? req.params[params.objectID]
    : prefix + '/' + req.params[params.objectID]
  const { buffer, size } = req.file
  const metadata = {
    'Content-Type': req.file.mimetype
  }
  const [err] = await core.objects.put(
    bucketID,
    objectID,
    buffer,
    size,
    metadata
  )
  if (err) {
    log.error({
      msg: err.message,
      error: err
    })
    return res.status(err.statusCode || 500).json({
      message: err.message || 'internal_server_error'
    })
  }
  log.info({
    msg: 'object_stored',
    data: { bucketID, objectID, prefix, metadata }
  })
  res.status(200).json({
    message: 'object_stored'
  })
}

exports = module.exports = { params, queries, get, list, put }
