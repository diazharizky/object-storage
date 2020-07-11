'use strict'

/* global MyError */
require('../types')
const minio = require('../services/minio')

/**
 *
 * @param {string} bucketID
 */
const make = async (bucketID) => {
  const [err, exists] = await minio.buckets.exists(bucketID)
  if (err || exists) {
    return [err || new MyError(400, 'bucket_already_exists')]
  }
  return minio.buckets.make(bucketID)
}

/**
 *
 * @param {string} bucketID
 */
const exists = async (bucketID) => minio.buckets.exists(bucketID)

/**
 *
 * @param {string} bucketID
 */
const getPolicy = async (bucketID) => {
  const [err, exists] = await minio.buckets.exists(bucketID)
  if (err || !exists) {
    return [err || new MyError(404, 'bucket_not_found')]
  }
  return minio.buckets.getPolicy(bucketID)
}

/**
 *
 * @param {string} bucketID
 * @param {string} policy
 */
const setPolicy = async (bucketID, policy) => {
  const [err, exists] = await minio.buckets.exists(bucketID)
  if (err || !exists) {
    return [err || new MyError(404, 'bucket_not_found')]
  }
  return minio.buckets.setPolicy(bucketID, policy)
}

exports = module.exports = { make, exists, getPolicy, setPolicy }
