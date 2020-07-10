'use strict'

const core = require('../../core')
const log = require('../../utils/log')

const params = {
  bucketID: 'bucket_id'
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const make = async (req, res) => {
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
  log.info({
    msg: 'bucket_created',
    data: { bucketID }
  })
  res.status(201).json({
    message: 'bucket_created'
  })
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const getPolicy = async (req, res) => {
  const bucketID = req.params[params.bucketID]
  const [err, data] = await core.buckets.getPolicy(bucketID)
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
    data
  })
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const setPolicy = async (req, res) => {
  const bucketID = req.params[params.bucketID]
  const policy = JSON.stringify(req.body.policy)
  const [err] = await core.buckets.setPolicy(bucketID, policy)
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
    msg: 'bucket_policy_updated',
    data: { bucketID, policy }
  })
  res.status(204).json({
    message: 'bucket_policy_updated'
  })
}

exports = module.exports = { params, make, getPolicy, setPolicy }
