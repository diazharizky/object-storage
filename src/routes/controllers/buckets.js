'use strict'

const core = require('../../core')
const log = require('../../utils/log')

const params = (exports.params = {
  bucketID: 'bucket_id'
})

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {*}
 */
async function make (req, res) {
  const bucketID = req.params[params.bucketID]
  const [err] = await core.buckets.make(bucketID)
  if (err) {
    log.error({
      msg: err.message,
      error: err
    })
    return res.status(err.statusCode || 500).json({
      message: err.message || 'internal_server_error'
    })
  }
  res.status(201).json({
    message: 'bucket_created'
  })
}
exports.make = make
